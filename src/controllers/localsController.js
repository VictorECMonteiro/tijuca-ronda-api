const Service = require("../services/localService.js");
require("dotenv").config();
const localService = new Service();

const localCreateController = async (req, res) => {
  let dados = req.body
  //Controller para criação de locais
  const fresult = await localService.localCreate(dados.nomeLocal, dados.latitude, dados.longitude, req.header.idSetor);

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
  //Controler, listar locais existente no banco de dados
  const fresult = await localService.list();

  if (!fresult) {
    res.status(400).send({
      success: false,
    });
  } else {
    res.status(200).send(fresult);
  }
};
const editController = async (req, res) => {
  const dados = req.body;
  //Controller Editar dados de um local
  const fresult = await localService.edit(dados);
  fresult ? res.status(200).send({ success: true }) : res.status(400).send({ success: true })
}
const deleteLocalController = async (req, res) => {
  //Controller para deletar um local 
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
  editController
};
