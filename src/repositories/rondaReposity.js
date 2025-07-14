const { where } = require("sequelize");
const sequelize = require("../configs/sequelize");
const registroRonda = require("../models/modelRondas");
const registroRota = require("../models/modelRotas");
const registroLocal = require("../models/modelLocais");
const registroRotaLocal = require("../models/modelRotas_Locais");
const compararHora = require("../utils/compararHora");
const date = require("../utils/date");
const retornaHoras = require("../utils/retornaHoras");
const retornaHorasComTolerancia = require("../utils/retornaHorasComTolerancia");
const Rotas_Locais = require("../models/modelRotas_Locais");
let logClassInstance = require("./geralReposity");

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
        let fresposta = [];
        for (let i = 0; i <= resposta.length - 1; i++) {
          const retrievingLocals = await Rotas_Locais.findAll({
            where: { idRota: resposta[i].idRota },
          });
          // console.log(retrievingLocals)
          for (let j = 0; j <= retrievingLocals.length - 1; j++) {
            // console.log(j);
            // console.log(retrievingLocals[j].idLocal);
            const retrievingLocalsName = await registroLocal.findOne({
              where: {
                idLocal: retrievingLocals[j].idLocal,
              },
            });
            retrievingLocals[j].dataValues["nomeLocal"] =
              retrievingLocalsName.nomeLocal;
            // console.log(retrievingLocalsName.nomeLocal)
            // console.log(retrievingLocals)
          }
          // console.log(retrievingLocals)

          const retrievingRoute = await registroRota.findOne({
            where: {
              idRota: resposta[i].dataValues.idRota,
            },
          });
          fresposta.push({
            ...resposta[i].dataValues, // Keep original response data
            retrievingLocals,
            retrievingRoute, 
          });
        }

        // console.log(fresposta);
        return fresposta;
      }
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }
  //REFAZER
  async rondaCriar() {
    try {
      // const rotas = await registroRota.findAll();

      let rotas = await sequelize.sequelize.query(`
        SELECT rotas.*, ru.idUsuario from rotas
        LEFT JOIN rota_users as ru on rotas.idRota = ru.idRota;`, {type: sequelize.Sequelize.QueryTypes.SELECT})

      if (rotas.length === 0) {
        return false;
      }
      // console.log(rotas)

      for (let i = 0; i <= rotas.length - 1; i++) {
        await registroRonda.create({
          nomeRota: rotas[i].nomeRota,
          data: date(),
          idRota: rotas[i].idRota,
          idUsuario: rotas[i].idUsuario,
          status: 0,
        }, {
          
        });
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
      let locais = [];
      let horario = [];
      const rondaAtual = await registroRonda.findOne({
        where: {
          idRonda: idRonda,
        },
      });
      const rotaAtual = await registroRota.findOne({
        where: {
          idRota: rondaAtual.dataValues.idRota,
        },
      });
      const locaisRota = await registroRotaLocal.findAll({
        where: {
          idRota: rotaAtual.idRota,
        },
      });
      if (rondaAtual.dataValues.status != 0) {
        return false;
      }

      let compareHour = compararHora(
        rotaAtual.dataValues.horarioInicio,
        retornaHorasComTolerancia(retornaHoras(), 15)
      );

      if (compareHour == true) {
        await registroRonda.update(
          {
            observacao: "Atrasado Ao Iniciar",
            horaInicio: retornaHoras(),
            status: 1,
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
            status: 1,
          },
          {
            where: {
              idRonda: idRonda,
            },
          }
        );
      }

      locaisRota.forEach((element) => {
        locais.push(element.dataValues.idLocal);
        horario.push(element.dataValues.horario);
      });
      return {
        idRonda: rondaAtual.idRonda,
        horario: horario,
        locais: locais,
      };
    } catch (e) {
      console.log(e);
    }
  }

  //REFAZER
  async encerraRonda(data) {
    let logClass = new logClassInstance()
    let horarioAtual = retornaHoras()



// observacoes: [
//  {idLocal: ["observação1", "observação2"]}
// ]
//





    try {
      // const rondaAtual = await sequelize.sequelize.query(
      //   `select * from rondas as r
      //    LEFT JOIN rotas as rt on rt.idRota = r.idRota
      //    WHERE r.idRonda = :idRonda`,
      //   {
      //     replacements: {
      //       idRonda: data.idRonda,
      //     },
      //     type: sequelize.Sequelize.QueryTypes.SELECT,
      //   }
      // );

      // if (rondaAtual[0].status != 1) {
      //   return false;
      // }
      
      // for (let i = 0; i <= data.locaisVisitados.length - 1; i++) {
      //   await logClass.writeLog( 
      //     rondaAtual[0].idUsuario,
      //     data.idRonda,
      //     data.latitude[i],
      //     data.longitude[i],
      //     data.locais[i],
      //     horarioAtual,
      //     rondaAtual[0].idRota
      //   );
      // }

      // const compareHour = compararHora(
      //   retornaHoras(),
      //   retornaHorasComTolerancia(rondaAtual[0].horaInicio + 360)
      // );
      // if (compareHour == true) {
      //   await registroRonda.update(
      //     {
      //       observacao: rondaAtual[0].observacao + "Atrasado ao Encerrar",
      //       horaFim: retornaHoras(),
      //       status: 2,
      //     },
      //     {
      //       where: {
      //         idRonda: data.idRonda,
      //       },
      //     }
      //   );
      // } else {
      //   await registroRonda.update(
      //     {
      //       horaFim: retornaHoras(),
      //       status: 2,
      //     },
      //     {
      //       where: {
      //         idRonda: data.idRonda,
      //       },
      //     }
      //   );
      // }
      // logClass = null
      console.log("Encerrando Ronda...")
      // console.debug(data)





      return true;
    } catch (e) {
      console.log(e);
    }
  }
  //MANTER, SO ADICIONAR IDUSUARIO NA QUERY DE RETORNO
  async retornaLocaisVisitados(idRonda) {
    const localFinded = await sequelize.sequelize.query(
      `
      SELECT distinct t4.nomeLocal, t5.idRonda, t5.hora, t4.idLocal, t5.idUsuario from rondas as t1
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

  async pesquisarRonda(dados) {
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

  async pesquisarRondaLogs(idRonda) {
    try {
      let fresposta = [];
      const resposta = await registroRonda.findOne({
        where: {
          idRonda: idRonda,
        },
      });

      const retrievingLocals = await Rotas_Locais.findAll({
        where: { idRota: resposta.idRota },
      });

      for (let j = 0; j <= retrievingLocals.length - 1; j++) {
        const retrievingLocalsName = await registroLocal.findOne({
          where: {
            idLocal: retrievingLocals[j].idLocal,
          },
        });
        retrievingLocals[j].dataValues["nomeLocal"] =retrievingLocalsName.nomeLocal;

      }

      const retrievingRoute = await registroRota.findOne({where:{
        idRota: resposta.dataValues.idRota
      }})
      fresposta.push({
        ...resposta.dataValues, // Keep original response data
        retrievingLocals,
        retrievingRoute // Add retrieved data
      });
      // console.log(fresposta)
      return fresposta;
    } catch (e) {
      return [];
    }
  }
  //Transformar em pesquisar ronda com filtro
  async returnAll(){
    try{
        const findAll = await registroRonda.findAll()
        return findAll;
    }
    catch(e){
      return []
    }
  }
  //
  async desfazerRota(idRonda){
    try{
      await registroRonda.update({
        status: 0
      },{
        where:{
          idRonda: idRonda
        }
      })
      return true
    }
    catch(e){
      return false
    }
  }





}

module.exports = rondaQueries;
