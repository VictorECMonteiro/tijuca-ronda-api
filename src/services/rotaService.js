const rotaQueries = require("../repositories/rotaReposity.js");

class rotaService {
  rotaQueriesl = new rotaQueries();

  async createService(nomeRota, horarioInicio, idLocal, horarioLocais,idUsuario) {
    const fresult = await this.rotaQueriesl.createRota(
      nomeRota,
      horarioInicio,
      idLocal,
      horarioLocais,
      idUsuario
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
