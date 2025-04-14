const rondaQueries = require("../repositories/rondaReposity");

class rondaService {
  rondaQueriesL = new rondaQueries();

  constructor() {}
  async gerarRetornarRondas() {
    try {
      const fresult = await this.rondaQueriesL.gerarRetornar();
      // console.log(fresult);
      return fresult;
    } catch (e) {}
  }
  async iniciarRonda(idRonda) {
    try {
      const fresult = await this.rondaQueriesL.iniciarRonda(idRonda);
      return fresult;
    } catch (E) {
      console.log(E);
      return false;
    }
  }

  async pararRonda(data) {
    // console.log(idRonda);
    try {
      const fresult = await this.rondaQueriesL.encerraRonda(data);
      return fresult;
    } catch (e) {
      console.log(e)
    }
  }

  async retornaLocaisVisitados(idRonda) {
    try {
      const fresult = await this.rondaQueriesL.retornaLocaisVisitados(idRonda);
      return fresult;
    } catch (e) {
      console.log(e);
    }
  }

  async rondaSearch(dados) {
    const fresult = await this.rondaQueriesL.rondaSearch(dados);
    return fresult;
  }

  async rondaSearchLogs(idRonda) {
    const fresult = await this.rondaQueriesL.rondaSearchLogs(idRonda);
    return fresult;
  }
}
module.exports = rondaService;
