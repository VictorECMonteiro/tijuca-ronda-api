const Service = require("../services/geralsService.js");
const geralsService = new Service();
require("dotenv").config();

const writeLogController = async (req, res) => {
  //Controller, aceita requisição, repassa para as demais camadas, e responde ao receber o retorno das demais camadas
  const dados = req.body;
  const fresult = await geralsService.writeLog(
    dados.idUsuario,
    dados.idRonda,
    dados.latitude,
    dados.longitude,
    dados.idLocal
  );
  //Envia resposta com codigo de erro á basear com no retorno das demais camadas
  //400 - Erro em alguma das camadas
  //200 - Todas as camadas responderam e exerceram corretamente suas funções
  fresult
    ? res.status(200).send({ success: true, msg: "Log criado com sucesso" })
    : res.status(400).send({ success: false, msg: "Erro ao criar log" });
};


const searchLogController = async (req, res) => {
  //Controller, retorn todas os registros baseado no idRonda, levando os dados para as demais camadas e respondendo requisição ao obter retorno
  const dados = req.body;
  const fresult = await geralsService.searchReturn(dados.idRonda);

  //400 - Erro em alguma das camadas
  //200 - Todas as camadas responderam e exerceram corretamente suas funções
  fresult.length === 0 ? res.status(400).send({ success: false }) : res.status(200).send(fresult)

};

const logDataController = async (req, res) => {
  const dados = req.body;
  const fresult = await geralsService.logDataService(dados.idRonda);
  fresult.length === 0 ? res.status(400).send({ success: false }) : res.status(200).send(fresult)
}

const getDataLog = async (req,res)=>{
  const dados = req.params
  
  const fresult = await geralsService.getDataLog

  res.send("wiwiwi" + dados.idRonda)

}




module.exports = { writeLogController, searchLogController, logDataController, getDataLog };

