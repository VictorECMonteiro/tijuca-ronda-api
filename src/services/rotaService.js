const rotaQueries = require("../repositories/rotaReposity.js");

class rotaService {
  rotaQueriesl = new rotaQueries();

  async createService(nomeRota, horarioInicio, idLocal) {
    const fresult = await this.rotaQueriesl.createRota(
      nomeRota,
      horarioInicio,
      idLocal
    );
    return fresult;
  }
  async delete(idRota) {
    const fresult = await this.rotaQueriesl.delete(idRota);
    return fresult;
  }
  async list() {
    const fresult = await this.rotaQueriesl.list();
    return fresult;
  }
}

module.exports = rotaService;
