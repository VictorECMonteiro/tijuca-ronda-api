const { type } = require("express/lib/response");
const sequelize = require("../configs/sequelize");
const modelGeral = require("../models/modelGerais");
registroRotas = require("../models/ModelRotas")
const date = require("../utils/date");
const horasAtual = require("../utils/retornaHoras");
class geral {
  constructor() {}

  writeLog = async (idUsuario, idRonda, latitude, longitude, idLocal, hora, idRota) => {
    try {



      // const rotaAtual = await registroRotas.findOne({
      //   where:{
      //     idRonda: idRonda
      //   }
      // })
      const writeLogInTable = await modelGeral.create({
        latitude: latitude,
        longitude: longitude,
        data: date(),
        hora: hora,
        idRota: idRota,
        idRonda: idRonda,
        idLocal: idLocal,
        idUsuario: idUsuario,
        idRota: idRota
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
const geralFactory = {
  get geral(){
    return new geral()
  }


}



module.exports = geralFactory;
