const { type } = require("express/lib/response");
const sequelize = require("../configs/sequelize");
const modelGeral = require("../models/modelGerais");
const date = require("../utils/date");
const horasAtual = require("../utils/retornaHoras");
class geral {
  constructor() {}

  writeLog = async (idUsuario, idRonda, latitude, longitude, idLocal) => {
    try {
      // const verifyLocal = await sequelize.sequelize.query(
      //   `
      //   SELECT t3.nomeLocal, t4.idRonda, t4.hora from rondas as t1
      //   LEFT JOIN rotas as t2 on t1.idRota = t2.idRota
      //   LEFT JOIN locais as t3 on t2.idLocal = t3.idLocal
      //   LEFT JOIN gerais as t4 on t4.idRonda = t1.idRonda
      //   where t1.idRonda = :idRonda;`,
      //   {
      //     replacements: {
      //       idRonda: idRonda,
      //     },
      //     type: sequelize.Sequelize.QueryTypes.SELECT,
      //   }
      // );z
      // console.log(verifyLocal);
      // for (var i = 0; i <= verifyLocal.length - 1; i++) {
      //   let verifyLocalTemp = verifyLocal[i];
      //   if (verifyLocalTemp.idRonda != null && verifyLocal.length - 1 === i) {
      //     return false;
      //   }
      // }
      // [
      //   {
      //     "nomeLocal": "Pátio",
      //     "idRonda": null,
      //     "hora": null
      //   },
      //   {
      //     "nomeLocal": "Pátio",
      //     "idRonda": null,
      //     "hora": null
      //   }
      // ]
      const getRota = await sequelize.sequelize.query(
        ` SELECT ro.idRota FROM rondas as r
          LEFT JOIN rotas as ro on r.idRota = ro.idRota
          where r.idRonda = :idRonda;
                `,
        {
          replacements: {
            idRonda: idRonda,
          },
          type: sequelize.Sequelize.QueryTypes.SELECT,
        }
      );
      const writeLogInTable = await modelGeral.create({
        latitude: latitude,
        longitude: longitude,
        data: date(),
        hora: horasAtual(),
        idRota: getRota[0].idRota,
        idRonda: idRonda,
        idLocal: idLocal,
        idUsuario: idUsuario,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  searchLog = async (idRonda) => {
    const query = sequelize.sequelize.query(
      `
      SELECT gerais.data, gerais.hora,gerais.latitude, gerais.longitude, l.nomeLocal, u.nomedeUsuario, r.nomeRota FROM gerais
      LEFT JOIN rondas as r on gerais.idRonda = r.idRonda
      LEFT JOIN usuarios as u on gerais.idUsuario = u.idUsuario
      LEFT JOIN locais as l on l.idLocal = gerais.idLocal
      where r.idRonda = :idRonda;
      `,
      {
        replacements: {
          idRonda: idRonda,
        },
        type: sequelize.Sequelize.QueryTypes.SELECT,
      }
    );

    console.log(query);
    return query;
  };
}

module.exports = geral;
