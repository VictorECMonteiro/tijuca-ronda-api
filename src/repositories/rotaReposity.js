const registroRota = require("../models/ModelRotas");
const registroRonda = require("../models/ModelRondas");
const registroLocal = require("../models/modelLocais");
const sequelize = require("../configs/sequelize");
const { where } = require("sequelize");
const verificarItensRepetidos = require("../utils/verificarItemRepetido");

class rotaQueries {
  constructor() {}

  async createRota(nomeRota, horarioInicio, idLocal) {
    try {
      //Valida se o array de locais tem itens repetidos
      const validator = verificarItensRepetidos(idLocal);
      //Valida se o array está vazio
      const lengthValidator = idLocal.length === 0;

      if (!validator && !lengthValidator) {
        for (let i = 0; i <= idLocal.length - 1; i++) {
          if (i > 0) {
            const [result, metadata] = await sequelize.sequelize.query(
              `INSERT INTO rotas(idRota, nomeRota,horarioInicio,idLocal) 
         SELECT (SELECT COALESCE(MAX(idRota), 0) FROM rotas),
         :nomeRota, :horarioInicio , :idLocal`,
              {
                replacements: {
                  nomeRota: nomeRota,
                  horarioInicio: horarioInicio,
                  idLocal: idLocal[i],
                },
                type: sequelize.Sequelize.QueryTypes.INSERT,
              }
            );
          } else {
            const [result, metadata] = await sequelize.sequelize.query(
              `INSERT INTO rotas(idRota, nomeRota,horarioInicio,idLocal) 
             SELECT (SELECT COALESCE(MAX(idRota), 0)+1 FROM rotas),
             :nomeRota, :horarioInicio , :idLocal`,
              {
                replacements: {
                  nomeRota: nomeRota,
                  horarioInicio: horarioInicio,
                  idLocal: idLocal[i],
                },
                type: sequelize.Sequelize.QueryTypes.INSERT,
              }
            );
          }
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
      const fresult = await registroRota.destroy({
        where: {
          idRota: idRota,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
  async list() {
    try {
      const fresult = await registroRota.findAll();
      return fresult;
    } catch (e) {
      return [];
    }
  }
}

module.exports = rotaQueries;
