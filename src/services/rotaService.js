const rotaQueries = require("../repositories/rotaReposity.js");
const verificarItensRepetidos = require("../utils/verificarItemRepetido");

class rotaService {
  rotaQueriesl = new rotaQueries();

  async createService(nomeRota, horarioInicio, idLocal, horarioLocais, idUsuario) {
    let nomeRotaFormatado = nomeRota.toLowerCase()

    //Valida se o array de locais tem itens repetidos
    const validator = verificarItensRepetidos(idLocal);
    //Valida se o array está vazio
    const lengthValidator = idLocal.length === 0;

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
  async listLocals(idRota) {
    const fresult = await this.rotaQueriesl.listLocals(idRota)
    return fresult;
  }
  async defUserServ(idRota, idUsuario) {
    const fresult = await this.rotaQueriesl.defUser(idRota, idUsuario)
    return fresult;
  }
}

module.exports = rotaService;
