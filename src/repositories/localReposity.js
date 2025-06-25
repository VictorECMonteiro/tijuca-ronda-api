const modelLocal = require("../models/modelLocais");
const modelRotaLocal = require("../models/modelRotas_Locais")

class localQueries {
  constructor() {}

  createLocal = async (nomeLocal, idSetor, latitude, longitude) => {
    try {
      const fresult = await modelLocal.create({
        nomeLocal: nomeLocal,
        latitude: latitude, 
        longitude: longitude,
        idSetor: idSetor
      });
      // console.log(fresult);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  listLocals = async () => {
    try {
      const fresult = await modelLocal.findAll();
      return fresult;
    } catch (E) {
      throw E;
    }
  };
  deleteLocal = async (idLocal) => {
    try {
      await modelLocal.destroy({
        where: {
          idLocal: idLocal,
        },
      });
      await modelRotaLocal.destroy({
        where: {
          idLocal: idLocal,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  };
}

module.exports = localQueries;
