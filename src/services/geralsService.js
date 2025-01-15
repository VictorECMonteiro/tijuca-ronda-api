const geralsQueries = require("../repositories/geralReposity.js");

class geralsService {
  geralQuery = new geralsQueries();
  constructor() {}

  writeLog = async (idUsuario, idRonda, latitude, longitude, idLocal) => {
    const result = await this.geralQuery.writeLog(
      idUsuario,
      idRonda,
      latitude,
      longitude,
      idLocal
    );
    return result;
  };
  searchReturn = async (idRonda) => {
    const fresult = await this.geralQuery.searchLog(idRonda);
    return fresult;
  };
}

module.exports = geralsService;
