const { where } = require("sequelize");
const sequelize = require("../configs/sequelize");
const registroRonda = require("../models/ModelRondas");
const registroRota = require("../models/ModelRotas");
const registroRotaLocal = require("../models/modelRotas_Locais")
const compararHora = require("../utils/compararHora");
const date = require("../utils/date");
const retornaHoras = require("../utils/retornaHoras");  
const retornaHorasComTolerancia = require("../utils/retornaHorasComTolerancia");
let logClass = require("./geralReposity").geral
require("dotenv").config();

// const dumbData = {
//   idRonda: 3,
//   idUsuario: 1,
//   horario: ["13:00", "13:00"],
//   locais:  [1, 2],
//   locaisVisitados: [1,2],
//   latitude: [-3.8565266, -3.8565266],
//   longitude: [-38.5100779, -38.5100779]
// }

//CLASS RONDAS: INTERAÇÂO E OPERAÇÔES COM TABELA RONDAS NO SQL
class rondaQueries {
  constructor() {}

  //GERA E RETORNA RONDAS DA DATA ATUAL PARA O APP TIJUCA RONDA, CASO NAO TENHA AINDA RONDAS COM A DATA ATUAL NO BANCO, AS GERA AUTOMATICAMENTE

  async gerarRetornar() {
    try {
      const dataAtual = date();

      //PROCURA RONDAS COM A DATA ATUAL NO BANCO
      const resposta = await registroRonda.findAll({
        where: { data: dataAtual },
      });

      //CASO RETORNE UM ARRAY VAZIO (NAO HOUVE RONDAS NA DATA ATUAL) CHAMA A FUNÇÃO "rondaCriar" QUE SE ENCARREGA DE CRIAR AS RONDAS DO DIA
      if (resposta.length === 0) {
        const rondaCriada = await this.rondaCriar();
        //SE AS RONDAS FOREM CRIADAS COM SUCESSO, RE-CHAMA A FUNÇÃO PARA REALIZAR O RETORNO DA TABELA RONDAS
        if (rondaCriada === true) {
          const fresult = await this.gerarRetornar();
          return fresult;
        }
      } else {
        return resposta;
      }
    } catch (e) {
      return { success: false };
    }
  }
  //REFAZER
  async rondaCriar() {
    try {
      const rotas = await registroRota.findAll();

      if (rotas.length === 0) {
        return false;
      } 

      for(let i = 0; i<=rotas.length - 1; i++){
        await registroRonda.create({
          nomeRota: rotas[i].dataValues.nomeRota,
          data: date(),
          idRota: rotas[i].dataValues.idRota,
          idUsuario: rotas[i].dataValues.idUsuario,
          status: 0
        })
        
      }

      return true;
      
    } catch (e) {
      return false;
    }
  }
  async retornaRondas() {
    try {
      const dataAtual = date();
      const resposta = await registroRonda.findAll({
        where: {
          data: dataAtual,
        },
      });
      
      return resposta;
    } catch (e) {}
  }
  

  //METODO PARA INICIAR RONDA, USA-SE ""
  async iniciarRonda(idRonda) {
    try {
      let locais = []
      let horario = []
      const rondaAtual = await registroRonda.findOne({where:{
        idRonda: idRonda
      }})
      const rotaAtual = await registroRota.findOne({where:{
        idRota: rondaAtual.dataValues.idRota
      }}) 
      const locaisRota = await registroRotaLocal.findAll({where:{
        idRota: rotaAtual.idRota
      }})
      if(rondaAtual.dataValues.status != 0){
        return false
      } 
      
      let compareHour = compararHora(rotaAtual.dataValues.horarioInicio, retornaHorasComTolerancia(retornaHoras(), 15))

        if (compareHour == true) {
          await registroRonda.update(
            {
              observacao: "Atrasado Ao Iniciar",
              horaInicio: retornaHoras(),
              status: 1
            },
            {
              where: {
                idRonda: idRonda,
              },
            }
          );
        } else {
          await registroRonda.update(
            {
              horaInicio: retornaHoras(),
              status: 1
            },
            {
              where: {
                idRonda: idRonda,
              },
            }
          );
        }
        

      locaisRota.forEach(element => {
        locais.push(element.dataValues.idLocal)
        horario.push(element.dataValues.horario)
      });
      return {
        idRonda: rondaAtual.idRonda,
        horario: horario,
        idLocal: locais
      };
    } catch (e) {
      console.log(e);
    }
  }


  //REFAZER
  async encerraRonda(data) {
    try {
      const rondaAtual = await sequelize.sequelize.query(
        `select * from rondas as r
         LEFT JOIN rotas as rt on rt.idRota = r.idRota
         WHERE r.idRonda = :idRonda`,
        {
          replacements: {
            idRonda: data.idRonda,
          },
          type: sequelize.Sequelize.QueryTypes.SELECT
        }
      );
      
      if(rondaAtual[0].status != 1){
        return false
      }



      for(let i=0; i<= data.locaisVisitados.length - 1; i++){
        await logClass.writeLog(data.idUsuario, data.idRonda,data.latitude[i], data.longitude[i], data.locais[i], data.horario[i], rondaAtual[0].idRota)
      }
      const compareHour = compararHora(
        retornaHoras(),
        retornaHorasComTolerancia(rondaAtual[0].horaInicio + 360)
      );
      if (compareHour == true) {
        await registroRonda.update(
          {
            observacao: rondaAtual[0].observacao + "Atrasado ao Encerrar",
            horaFim: retornaHoras(),
            status: 2
          },
          {
            where: {
              idRonda: data.idRonda,
            },
          }
        );
      } else {
        await registroRonda.update(
          {
            horaFim: retornaHoras(),
            status: 2
          },
          {
            where: {
              idRonda: data.idRonda,
            },
          }
        );
      }
      return true;
    } catch (e) {
      console.log(e);
    }
  }
  //MANTER, SO ADICIONAR IDUSUARIO NA QUERY DE RETORNO
  async retornaLocaisVisitados(idRonda) {
    const localFinded = await sequelize.sequelize.query(
      `
      SELECT distinct t4.nomeLocal, t5.idRonda, t5.hora, t4.idLocal from rondas as t1
      LEFT JOIN rotas as t2 on t1.idRota = t2.idRota
      LEFT JOIN rotas_locais as t3 on t3.idRota = t2.idRota
      LEFT JOIN locais as t4 on t4.idLocal = t3.idLocal
      LEFT JOIN gerais as t5 on t5.idRonda = t1.idRonda AND t5.idLocal = t3.idLocal
      where t1.idRonda = :idRonda;`,
      {
        replacements: {
          idRonda: idRonda,
        },
        type: sequelize.Sequelize.QueryTypes.SELECT,
      }
    );

    return localFinded.flat();
  }
  async rondaSearch(dados) {
    try {
      var json = {};
      for (let key in dados) {
        if (dados[key]) {
          json[key.toString()] = dados[key];
        }
      }
      const fresult = await registroRonda.findAll({ where: json });
      return fresult;
    } catch (e) {
      console.log(e);
    }
  }

  async rondaSearchLogs(idRonda) {
    try {
      const logs = await sequelize.sequelize.query(
        `SELECT t4.* from rondas as t1
         LEFT JOIN gerais as t4 on t4.idRonda = t1.idRonda
         where t1.idRonda = :idRonda;`,
        {
          replacements: {
            idRonda: idRonda,
          },
          type: sequelize.Sequelize.QueryTypes.SELECT,
        }
      );
      return logs;
    } catch (e) {
      return [];
    }
  }
}

module.exports = rondaQueries;
