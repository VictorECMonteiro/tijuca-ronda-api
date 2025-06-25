const registroRota = require("../models/modelRotas");
const registroRonda = require("../models/modelRondas");
const registroLocal = require("../models/modelLocais");
const registroRotas_Locais = require("../models/modelRotas_Locais")
const sequelize = require("../configs/sequelize");
const verificarItensRepetidos = require("../utils/verificarItemRepetido");
const rotaUserReposity = require("./rotaUserReposity")

class rotaQueries {
  constructor() { }

  async createRota(nomeRota, horarioInicio, idLocal, horarioLocais) {
    try { 
      //Valida se o array de locais tem itens repetidos
      const validator = verificarItensRepetidos(idLocal);
      const locais  = await registroLocal.findAll()
      //Valida se o array está vazio
      const lengthValidator = idLocal.length === 0;
      //Instancia classe de reposity Usuario - Rota
      let rotaUserReposityInstance = new rotaUserReposity()
      //Cria rota no banco de dados
      const rotaCriada = await registroRota.create({
        nomeRota: nomeRota,
        horarioInicio: horarioInicio
      })
      //Faz a checagen dos dados
      if (!validator && !lengthValidator && locais.length > 0) {
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
      }
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
      const fresult = await registroRota.findAll(); 
      return fresult.flat();
    } catch (e) {
      return [];
    }
  }
  async listLocals(idRota) {
    try {
      const fresult = await sequelize.sequelize.query(`
          SELECT l.nomeLocal, rl1.horario FROM rotas_locais as rl1
          LEFT JOIN locais as l on rl1.idLocal = l.idLocal
          WHERE rl1.idRota = :idRota;
        `, {
          replacements:{
            idRota: idRota
          },
          type: sequelize.Sequelize.QueryTypes.SELECT
        })
        return fresult;
    }
    catch (e) {
      return []
    }
  }
  async defUser(idRota, idUsuario){
    try{ 
      let rotaUserReposityInstance = new rotaUserReposity()

      await rotaUserReposityInstance.updateRotaUser(idRota, idUsuario)


      return true
    }
    catch(e){
      return false
    
    }

  }
}

module.exports = rotaQueries;
