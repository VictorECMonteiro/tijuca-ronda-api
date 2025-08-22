const { type } = require("express/lib/response");
const sequelize = require("../configs/sequelize");
const modelGeral = require("../models/modelGerais");
registroRotas = require("../models/modelRotas")
const date = require("../utils/date");
const horasAtual = require("../utils/retornaHoras");
class geral {
  constructor() {

  }
  //Registra na tabela de geral o local de uma ronda que foi escaneado e retorna a linha criada
  writeLog = async (idUsuario, idRonda, latitude, longitude, idLocal, hora, idRota, atrasado) => {
    try {
      //Query inserindo registro na tabela
      const writeLogInTable = await modelGeral.create({
        latitude: latitude,
        longitude: longitude,
        data: date(),
        hora: hora,
        idRota: idRota,
        idRonda: idRonda,
        idLocal: idLocal,
        idUsuario: idUsuario,
        idRota: idRota,
        atrasado: atrasado
      });
      return writeLogInTable;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  //Pesquisa na tabela geral todas as linhas de um intervalo de idRonda
  searchLog = async (idRonda) => {
    try{


      //Query pesquisando usando o array vindo de idRonda
    const query = await sequelize.sequelize.query(
      `
      SELECT gerais.data, gerais.hora,gerais.latitude, gerais.longitude, l.nomeLocal, u.nomedeUsuario, r.nomeRota, gerais.idRonda FROM gerais
      LEFT JOIN rondas as r on gerais.idRonda = r.idRonda
      LEFT JOIN usuarios as u on gerais.idUsuario = u.idUsuario
      LEFT JOIN locais as l on l.idLocal = gerais.idLocal
      where r.idRonda in (:idRonda);
      `,
      {
        replacements: {
          idRonda: idRonda,
        },
        type: sequelize.Sequelize.QueryTypes.SELECT,
      }
    );
    return query;
  }
  catch(e){
    return []
  }
  };
  logDataQuery = async (idRonda) =>{
    try{
    const query = await sequelize.sequelize.query(`
      SELECT l.nomeLocal, r.nomeRota, rt.horario, g.data, g.hora, u.nomedeUsuario, g.latitude, g.longitude FROM gerais as g
      LEFT JOIN locais as l on g.idLocal = l.idLocal
      LEFT JOIN rotas as r on g.idRota = r.idRota
      LEFT JOIN rotas_locais as rt on g.idRota = rt.idRota AND rt.idLocal = g.idLocal
      LEFT JOIN usuarios as u on g.idUsuario = u.idUsuario
      where g.idronda in (:idRonda);`,
      {
        replacements: {
          idRonda: idRonda,
        },
        type: sequelize.Sequelize.QueryTypes.SELECT,
      }
      )
      return query
    }
    catch(e){
      return []
    }

  }
  getAndMountDataQuery = async (idRonda) => {
    try{
      






    }
    catch(e){



      

    }

  }










}
// const geralFactory = {
//   get geral(){
//     return new geral()
//   }
// }



module.exports = geral;
