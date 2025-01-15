const localQueries = require("../repositories/localReposity.js");

class localService {
  querieLocals = new localQueries();
  constructor() {}

  localCreate = async (nomeLocal) => {
    try {
      const fresult = await this.querieLocals.createLocal(nomeLocal);
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
  delete = async (idLocal)=>{
    const fresult = await this.querieLocals.deleteLocal(idLocal)
    return fresult
  }
}

module.exports = localService;
