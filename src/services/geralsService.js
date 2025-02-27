const geralsQueries = require("../repositories/geralReposity.js");

class geralsService {
  
  constructor() {}

  writeLog = async (idUsuario, idRonda, latitude, longitude, idLocal) => {
    const result = await geralsQueries().writeLog(
      idUsuario,
      idRonda,
      latitude,
      longitude,
      idLocal
    );
    return result;
  };
  searchReturn = async (idRonda) => {
    const fresult = await geralsQueries().searchLog(idRonda);
    return fresult;
  };
}

module.exports = geralsService;
