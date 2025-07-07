const Service = require("../services/geralsService.js");
const geralsService = new Service();
require("dotenv").config();

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
  fresult.length === 0?res.status(400).send({success: false}):res.status(200).send(fresult)
  
};
const logDataController = async(req,res)=>{
  const dados = req.body;
  const fresult = await geralsService.logDataService(dados.idRonda);
  fresult.length === 0?res.status(400).send({success: false}):res.status(200).send(fresult)

}


module.exports = { writeLogController, searchLogController, logDataController};

