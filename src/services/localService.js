const localQueries = require("../repositories/localReposity.js");

class localService {
  querieLocals = new localQueries();
  constructor() { }

  localCreate = async (nomeLocal, latitude, longitude, idSetor) => {
    try {
      const fresult = await this.querieLocals.createLocal(nomeLocal, latitude, longitude, idSetor);
      return true;
    } catch (e) {
      return false;
    }
  };
  edit = async (dados) => {
    try {
      const fresult = await this.querieLocals.edit(dados);
      return true;
    } catch (e) {
      return false;
    }

  };
  list = async () => {
    try {
      const fresult = await this.querieLocals.listLocals();
      console.log(fresult)
      return fresult

    } catch (e) {
      console.log(e)
    }
  };
  delete = async (idLocal) => {
    const fresult = await this.querieLocals.deleteLocal(idLocal)
    return fresult
  }
}

module.exports = localService;
