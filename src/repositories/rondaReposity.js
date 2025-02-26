const { where } = require("sequelize");
const sequelize = require("../configs/sequelize");
const registroRonda = require("../models/ModelRondas");
const registroRota = require("../models/ModelRotas");
const compararHora = require("../utils/compararHora");
const date = require("../utils/date");
const retornaHoras = require("../utils/retornaHoras");
const retornaHorasComTolerancia = require("../utils/retornaHorasComTolerancia");
require("dotenv").config();

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
        const rondaCriada = await this.rondaCriar(dataAtual);
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
  async rondaCriar(nowDate) {
    try {
      const rotas = await registroRota.findAll();

      if (rotas.length === 0) {
        return false;
      } else {
        console.log(rotas);
        // Usando Set para garantir que apenas idRota únicos sejam processados
        const idsUnicos = Array.from(
          rotas
            .reduce((map, rota) => {
              if (!map.has(rota.idRota)) {
                map.set(rota.idRota, {
                  idRota: rota.idRota,
                  nomeRota: rota.nomeRota,
                });
              }
              return map;
            }, new Map())
            .values()
        );

        // // Criando uma promise para cada idRota único
        const promises = Array.from(idsUnicos).map((idRota) => {
          return registroRonda.create({
            horaInicio: "",
            horaFim: "",
            data: nowDate,
            observacao: "",
            idUsuario: null,
            idRota: idRota.idRota,
            nomeRota: idRota.nomeRota,
          });
        });

        // // Espera todas as promessas se resolverem
        await Promise.all(promises);
        console.log("Funcionou");

        return true;
      }
    } catch (e) {
      // console.log(e);
      console.log(e);
      return false;
    }
  }
  // async retornaRondas() {
  //   try {
  //     const dataAtual = date();
  //     const resposta = await registroRonda.findAll({
  //       where: {
  //         data: dataAtual,
  //       },
  //     });
  //     // console.log(resposta[0].nomeLocal);
  //     return resposta;
  //   } catch (e) {}
  // }
  //

  //METODO PARA INICIAR RONDA, USA-SE ""
  async iniciarRonda(idUsuario, idRonda) {
    try {
      const rondaAtual = await sequelize.sequelize.query(
        `select * from rondas as r
          LEFT JOIN rotas as rt on rt.idRota = r.idRota 
          WHERE r.idRonda = :idRonda`,
        {
          replacements: {
            idRonda: idRonda,
          },
          type: sequelize.Sequelize.SELECT,
        }
      );
      const rondaAtualFlat = rondaAtual.flat();


      //MODIFICAR
      if (rondaAtualFlat[0].idUsuario) {
        return false;
      } else {
        const compareHour = compararHora(
          retornaHorasComTolerancia(retornaHoras(), 20),
          rondaAtualFlat[0].horarioInicio
        );
      //

      //Modificar
        if (compareHour == true) {
          await registroRonda.update(
            {
              idUsuario: idUsuario,
              observacao: "Atrasado Ao Iniciar",
              horaInicio: retornaHoras(),
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
              idUsuario: idUsuario,
              horaInicio: retornaHoras(),
            },
            {
              where: {
                idRonda: idRonda,
              },
            }
          );
        }
        // console.log(rondaAtualFlat[0]);
      }
      //MODIFICAR RETORNO
      return true;
    } catch (e) {
      console.log(e);
    }
  }
  //REFAZER
  async encerraRonda(idRonda) {
    try {
      const rondaAtual = await sequelize.sequelize.query(
        `select * from rondas as r
         LEFT JOIN rotas as rt on rt.idRota = r.idRota
         WHERE r.idRonda = :idRonda`,
        {
          replacements: {
            idRonda: idRonda,
          },
          type: sequelize.Sequelize.SELECT,
        }
      );
      const rondaAtualFlat = rondaAtual.flat();
      console.log(rondaAtualFlat);
      const compareHour = compararHora(
        retornaHoras(),
        rondaAtualFlat[0].horarioInicio
      );
      if (rondaAtualFlat.idUsuario == true) {
        return false;
      }
      if (compareHour == true) {
        await registroRonda.update(
          {
            observacao: rondaAtualFlat[0].observacao + "Atrasado ao Encerrar",
            horaFim: retornaHoras(),
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
            horaFim: retornaHoras(),
          },
          {
            where: {
              idRonda: idRonda,
            },
          }
        );
      }
      // console.log(rondaAtualFlat[0]);
      return true;
    } catch (e) {
      console.log(e);
    }
  }
  //MANTER, SO ADICIONAR IDUSUARIO NA QUERY DE RETORNO
  async retornaLocaisVisitados(idRonda) {
    const localFinded = await sequelize.sequelize.query(
      `

      SELECT distinct t3.nomeLocal, t4.idRonda, t4.hora from rondas as t1
      LEFT JOIN rotas as t2 on t1.idRota = t2.idRota
      LEFT JOIN locais as t3 on t2.idLocal = t3.idLocal
      LEFT JOIN gerais as t4 on t4.idRonda = t1.idRonda AND t4.idLocal = t3.idLocal
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
