const geral = require("../repositories/geralReposity.js")



const geralsQueries = new geral()
// import geralFactory from "../repositories/geralReposity";

class geralsService {
  
  constructor() {}

  writeLog = async (idUsuario, idRonda, latitude, longitude, idLocal) => {
    const result = await geralsQueries.writeLog(
      idUsuario,
      idRonda,
      latitude,
      longitude,
      idLocal
    );
    return result;
  };
  searchReturn = async (idRonda) => {
    const fresult = await geralsQueries.searchLog(idRonda)
    return fresult;
  };
  logDataService = async (idRonda) =>{
    const fresult = await geralsQueries.getAndMountDataQuery(idRonda)
    return fresult
  }
  getDataLog = async (idRonda) =>{
    const fresult = await geralsQueries.getAndMountDataLog(idRonda)
    
  }

}

module.exports = geralsService;
