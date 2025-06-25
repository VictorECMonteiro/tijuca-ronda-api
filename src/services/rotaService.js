const rotaQueries = require("../repositories/rotaReposity.js");

class rotaService {
  rotaQueriesl = new rotaQueries();

  async createService(nomeRota, horarioInicio, idLocal, horarioLocais,idUsuario) {
    let nomeRotaFormatado = nomeRota.toLowerCase()
    const fresult = await this.rotaQueriesl.createRota(
      nomeRotaFormatado,
      horarioInicio,
      idLocal,
      horarioLocais
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
  async listLocals(idRota){
    const fresult = await this.rotaQueriesl.listLocals(idRota)
    return fresult;
  }
  async defUserServ(idRota, idUsuario){
    const fresult = await this.rotaQueriesl.defUser(idRota, idUsuario)
    return fresult;
  }
}

module.exports = rotaService;
