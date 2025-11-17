const Service = require("../services/loginService");
require("dotenv").config();
const loginService = new Service();

const loginControllerHandleCreator = async (req, res, next) => {
  console.log(req.body.cpf, req.body.senhadeUsuario);
  //     {
  //         "nomedeUsuario": nomedeUsuario,
  //         "senhadeUsuario": senhadeUsuario,
  //         "permissao": permissao

  //     }
  //Requisita Service
  const fresult = await loginService.createService(
    req.body.nomedeUsuario,
    req.body.senhadeUsuario,
    req.body.permissao,
    req.body.cpf,
    req.body.idSetor
  );
  //Responde a requisição com base na resposta do service
  fresult == true
    ? res.send({ success: true, err: 1, msg: "Login criado com sucesso" })
    : res.send({
        success: false,
        err: 2,
        msg: "Erro ao criar login, verifique as informações",
      });
};

//Controller responsavel por login
const loginControllerHandle = async (req, res, next) => {
  //Json para requisoção
  // {
  //     "cpf": cpf,
  //     "senhadeUsuario": senhadeUsuario
  // }
  

  //Requisita service
  const fresult = await loginService.loginHandle(
    String(req.body.cpf),
    req.body.senhadeUsuario
  );
  //Responde a requisição com resultado do service
  // console.log(fresult + "resultado final");
  fresult.success == true
    ? res.send(fresult)
    : res.status(400).json({ fresult });

  // res.send(fresult)
};
const loginControllerGetUsers = async (req, res, next) => {
  //Controller que retorna usuários contidos no banco
  const fresult = await loginService.getUsers();

  res.status(200).send(fresult);
};
const verifyToken = async (req, res, next) => {
  //Verifica o token através, em essencia, se chegar a essa camada ele somente responde porque se chegou aquim o token é valido
  console.log("TOKEN VERIFICADO")
  res.status(200).send({
    success: true,  
  });
};
const loginControllerModify = async (req, res, next) => {
  const dados = req.body;
  const fresult = await loginService.passwordModifyService(
    dados.idUsuario,
    dados.senhadeUsuarioAtual,
    dados.senhadeUsuarioNova
  );
  if (fresult.success) {
    res.status(200).send(fresult);
  } else {
    res.status(400).send(fresult);
  }
};
const loginControllerUserDataModify = async (req,res, next)=>{
  const dados = req.body;
  const fresult = await loginService.userDataModifyService(dados)
  fresult?res.status(200).send({success: true}): res.status(400).send({success: false})


}
const loginControllerDeactivate = async (req, res) => {
  //Desativa um usuário no banco de dados
  const dados = req.body;
  const fresult = await loginService.deactivateService(dados.idUsuario);
  fresult
    ? res
        .status(200)
        .send({ success: true, msg: "Usuario desativado com sucesso" })
    : res
        .status(400)
        .send({ success: true, msg: "Erro ao desativar o usuário" });
};

const loginDefineProfilePicture = async (req,res) =>{
    //Rota para definir foto de perfil, em teoria funciona...
    const files = req.files
    console.log(req.files)
    const fresult = await loginService.uploadProfilePicture(req.files)
    res.send({"success": true})

}







module.exports = {
  loginControllerHandleCreator,
  loginControllerHandle,
  loginControllerGetUsers,
  verifyToken,
  loginControllerModify,
  loginControllerDeactivate,
  loginControllerUserDataModify,
  loginDefineProfilePicture
};
