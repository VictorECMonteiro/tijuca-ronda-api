const modelLocal = require("../models/modelLocais");

class localQueries {
  constructor() {}

  createLocal = async (nomeLocal) => {
    try {
      const fresult = await modelLocal.create({
        nomeLocal: nomeLocal,
      });
      console.log(fresult);
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
      const fresult = await modelLocal.destroy({
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
