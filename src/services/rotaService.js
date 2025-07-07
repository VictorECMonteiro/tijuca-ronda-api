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
  async changeLocalOrderService(listaAnterior, listaAtual, idRota) {
    for (let i = 0; i <= listaAnterior.length - 1; i++) {
      if (listaAnterior[i] === listaAtual[i]) {
        listaAnterior.splice(i, i + 1);
        listaAtual.splice(i, i + 1);
      }
      for (let j = 0; j <= listaAnterior.length - 1; j++) {
        if (listaAnterior[i] === listaAtual[j]) {
          if (listaAnterior[j] === listaAtual[i]) {
            listaAnterior.splice(j, j + 1)
            listaAtual.splice(j, j + 1)
          }
        }
      }
    }


    const result = await this.rotaQueriesl.changeOrder(listaAnterior, listaAtual, idRota)
    return result;
  }
}

module.exports = rotaService;
