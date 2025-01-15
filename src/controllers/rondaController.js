const Service = require("../services/rondaService");
const rondaService = new Service();

const rondaCreateAndReturnController = async (req, res, next) => {
  const fresult = await rondaService.gerarRetornarRondas();
  // console.log(fresult);
  res.send(fresult);
};

const rondaIniciarController = async (req, res, next) => {
  const dados = req.body;
  const fresult = await rondaService.iniciarRonda(
    dados.idUsuario,
    dados.idRonda
  );
  if (fresult) {
    res.status(200).send({
      success: true,
      msg: "Ronda Iniciada com Sucesso",
    });
  } else {
    res.status(400).send({
      success: false,
      msg: "Ronda já iniciada",
    });
  }
};

const rondaStopController = async (req, res, next) => {
  const dados = req.body;

  const fresult = await rondaService.pararRonda(dados.idRonda);

  if (fresult) {
    res.status(200).send({
      success: true,
      msg: "Ronda Concluída",
    });
  } else {
    res.status(400).send({
      success: false,
      msg: "Ronda já encerrada",
    });
  }
};
const rondaReturnLocalsController = async (req, res) => {
  const dados = req.query;
  console.log(req.query);
  const fresult = await rondaService.retornaLocaisVisitados(dados.idRonda);
  console.log(fresult);
  if (fresult.length == 0 || undefined) {
    res.status(400).send({ success: false });
  } else {
    res.status(200).send(fresult);
  }
};
const rondaSearchController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.rondaSearch(dados);
  console.log(fresult);
  fresult.length == 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};
const rondaSearchLogsController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.rondaSearchLogs(dados.idRonda);
  fresult.length === 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};

module.exports = {
  rondaCreateAndReturnController,
  rondaIniciarController,
  rondaStopController,
  rondaReturnLocalsController,
  rondaSearchController,
  rondaSearchLogsController,
};
