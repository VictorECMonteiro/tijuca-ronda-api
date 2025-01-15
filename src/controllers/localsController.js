const Service = require("../services/localService.js");
require("dotenv").config();
const localService = new Service();

const localCreateController = async (req, res) => {
  console.log(req.body);
  const fresult = await localService.localCreate(req.body.nomeLocal);

  if (fresult) {
    res.status(200).send({ success: true, msg: "Local criado com sucesso" });
  } else {
    res.status(400).send({
      success: false,
      msg: "Erro desconhecido, contate o administrador",
    });
  }
};
const listController = async (req, res) => {
  const fresult = await localService.list();

  if (!fresult) {
    res.status(400).send({
      success: false,
    });
  } else {
    res.status(200).send(fresult);
  }
};
const deleteLocalController = async (req, res) => {
  const dados = req.body;
  const fresult = await localService.delete(dados.idLocal);
  fresult
    ? res.status(200).send({ success: true, msg: "Local excluido com sucesso" })
    : res.status(200).send({ success: false, msg: "Falha ao excluir o local" });
};

module.exports = {
  localCreateController,
  listController,
  deleteLocalController,
};
