const Service = require("../services/geralsService.js");
require("dotenv").config();
const geralsService = new Service();

const writeLogController = async (req, res) => {
  const dados = req.body;
  const fresult = await geralsService.writeLog(
    dados.idUsuario,
    dados.idRonda,
    dados.latitude,
    dados.longitude,
    dados.idLocal
  );

  fresult
    ? res.status(200).send({ success: true, msg: "Log criado com sucesso" })
    : res.status(400).send({ success: false, msg: "Erro ao criar log" });
};
const searchLogController = async (req, res) => {
  const dados = req.body;
  const fresult = await geralsService.searchReturn(dados.idRonda);
  return fresult;
};

module.exports = { writeLogController, searchLogController };
