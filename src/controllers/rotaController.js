const Service = require("../services/rotaService.js");
require("dotenv").config();
const rotaService = new Service();

const rotaCreateController = async (req, res, next) => {
  const fresult = await rotaService.createService(
    req.body.nomeRota,
    req.body.horarioInicio,
    req.body.idLocal,
    req.body.horarioLocais,
    req.body.idUsuario
  );

  fresult === true
    ? res.status(200).send({ success: true, msg: "Rota criada com sucesso" })
    : res
        .status(400)
        .send({ success: false, msg: "Não foi possivel criar rota" });
};

const rotaDeleteController = async (req, res) => {
  const dados = req.body;
  const fresult = await rotaService.delete(dados.idRota);
  fresult
    ? res.status(200).send({ success: true, msg: "Rota excluida com sucesso" })
    : res.status(400).send({ success: false, msg: "Erro ao excluir rota" });
};

const listController = async (req, res) => {
  const fresult = await rotaService.list();
  fresult.lenght == 0
    ? res.status(400).send({ success: false })
    : res.status(200).send(fresult);
};

module.exports = { rotaCreateController, rotaDeleteController, listController };
