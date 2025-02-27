const registroRota = require("../models/ModelRotas");
const registroRonda = require("../models/ModelRondas");
const registroLocal = require("../models/modelLocais");
const registroRotas_Locais = require("../models/modelRotas_Locais")
const sequelize = require("../configs/sequelize");
const verificarItensRepetidos = require("../utils/verificarItemRepetido");
// const { where } = require("sequelize");

class rotaQueries {
  constructor() {}

  async createRota(nomeRota, horarioInicio, idLocal, horarioLocais, idUsuario) {
    try {
      //Valida se o array de locais tem itens repetidos
      const validator = verificarItensRepetidos(idLocal);
      //Valida se o array está vazio
      const lengthValidator = idLocal.length === 0;

      const rotaCriada = await registroRota.create({
          nomeRota: nomeRota, 
          horarioInicio: horarioInicio,
          idUsuario: idUsuario
      })
      console.log(rotaCriada)
      if (!validator && !lengthValidator) {
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
      console.log(e);
      return false;
    }
  }
  async delete(idRota) {
    try {
      const destroyRotas_locais = await registroRotas_Locais.destroy({where:{
        idRota: idRota
      }})
      const rotaSelecionada = await registroRota.destroy({where:{
        idRota: idRota
      }})
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
}

module.exports = rotaQueries;
