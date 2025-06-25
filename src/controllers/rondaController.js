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
    dados.idRonda
  );
  if (fresult) {
    res.status(200).send(fresult);
  } else {
    res.status(400).send({
      success: false,
      msg: "Ronda já iniciada",
    });
  }
};

const rondaStopController = async (req, res, next) => {
  const dados = req.body;

  const fresult = await rondaService.pararRonda(
    dados
  );

  if (fresult) {
    res.status(200).send({
      success: true,
      msg: "Ronda Concluída",
    });
  } else {
    res.status(400).send({
      success: false,
      msg: "Ronda já encerrada ou erro desconhecido",
    });
  }
};
const rondaReturnLocalsController = async (req, res) => {
  const dados = req.query;
  // console.log(req.query);
  const fresult = await rondaService.retornaLocaisVisitados(dados.idRonda);
  if (fresult.length == 0 || undefined) {
    res.status(400).send({ success: false });
  } else {
    res.status(200).send(fresult);
  }
};
const pesquisarRondaController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.pesquisarRonda(dados);
  fresult.length == 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};
const pesquisarRondaLogsController = async (req, res) => {
  const dados = req.body;
  const fresult = await rondaService.pesquisarRondaLogs(dados.idRonda);
  fresult.length === 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};
const rondaFindAllController = async (req,res )=>{
  const dados = req.body;
  const fresult = await rondaService.rondaFindAll(dados.idRonda);
  fresult.length === 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
}

const undoRonda = async (req,res)=>{
  const dados = req.body
  const fresult = await rondaService.desfazerRonda(dados.idRonda)
  fresult.length === true
    ? res.status(200).send({ success: true })
    : res.status(400).send({ success: false });
}

module.exports = {
  rondaCreateAndReturnController,
  rondaIniciarController,
  rondaStopController,
  rondaReturnLocalsController,
  pesquisarRondaController,
  pesquisarRondaLogsController,
  rondaFindAllController,
  undoRonda
};
