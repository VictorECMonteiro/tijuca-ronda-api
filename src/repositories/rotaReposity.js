const registroRota = require("../models/modelRotas");
const registroRonda = require("../models/modelRondas");
const registroLocal = require("../models/modelLocais");
const registroRotas_Locais = require("../models/modelRotas_Locais")
const sequelize = require("../configs/sequelize");
const verificarItensRepetidos = require("../utils/verificarItemRepetido");
const rotaUserReposity = require("./rotaUserReposity")
const rotaLocalReposity = require("./rotaLocalreposity")

class rotaQueries {
  constructor() { }

  async createRota(nomeRota, horarioInicio, idLocal, horarioLocais) {
    try {

      const locais = await registroLocal.findAll()
      //Instancia classe de reposity Usuario - Rota
      let rotaUserReposityInstance = new rotaUserReposity()
      //Cria rota no banco de dados
      const rotaCriada = await registroRota.create({
        nomeRota: nomeRota,
        horarioInicio: horarioInicio
      })
      //Faz a checagen dos dados

      //Cria chave da rota na tabela Usuario-Rota
      await rotaUserReposityInstance.insertRotaInTable(rotaCriada.dataValues.idRota)
      //Cria chave da rota na tabela Locais-Rota
      for (let i = 0; i <= idLocal.length - 1; i++) {
        await registroRotas_Locais.create({
          horario: horarioLocais[i],
          idLocal: idLocal[i],
          idRota: rotaCriada.dataValues.idRota
        })
      }
      return true;

    } catch (e) {
      // console.log(e)

      return false;
    }
  }
  async delete(idRota) {
    try {
      let rotaUserReposityInstance = new rotaUserReposity()

      await registroRotas_Locais.destroy({
        where: {
          idRota: idRota
        }
      })
      await registroRota.destroy({
        where: {
          idRota: idRota
        }
      })
      await rotaUserReposityInstance.deleteRotaUser(idRota)
      return true;
    } catch (e) {
      return false;
    }
  }
  async list() {
    try {
      const fresult = await sequelize.sequelize.query(`
          SELECT rotas.*, usuarios."nomedeUsuario" FROM rotas
          LEFT JOIN rota_users on rota_users."idRota" = rotas."idRota"
          LEFT JOIN usuarios on rota_users."idUsuario" = usuarios."idUsuario";
          ;
        `, {
        type: sequelize.Sequelize.QueryTypes.SELECT
      })

      // const fresult = await registroRota.findAll();
      console.log(fresult)
      return fresult;
    } catch (e) {
      return [];
    }
  }
  async listLocals(idRota) {
    try {
      const fresult = await sequelize.sequelize.query(`
          SELECT l."nomeLocal", rl1."horario", rl1."idLocal", rl1."id" FROM rotas_locais as rl1
          LEFT JOIN locais as l on rl1."idLocal" = l."idLocal"
          WHERE rl1."idRota" = :idRota;
        `, {
        replacements: {
          idRota: idRota
        },
        type: sequelize.Sequelize.QueryTypes.SELECT
      })
      return fresult;
    }
    catch (e) {
      return e.message
    }
  }
  async defUser(idRota, idUsuario) {
    try {
      let rotaUserReposityInstance = new rotaUserReposity()
      await rotaUserReposityInstance.updateRotaUser(idRota, idUsuario)
      return true
    }
    catch (e) {
      return false

    }

  }
  async changeOrder(ordemAnterior, ordemAtual, idRota) {
    try {
      let rotaUserReposityInstance = new rotaLocalReposity()
      let result = rotaUserReposityInstance.changeOrder(ordemAnterior, ordemAtual, idRota);
      return result
    }
    catch (e) {

    }
  }
}

module.exports = rotaQueries;
