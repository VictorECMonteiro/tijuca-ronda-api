const loginQueries = require("../repositories/loginReposity");
const loginValidator = require("../validators/loginValidator");
require("dotenv").config();

class loginServices {
  loginQueries = new loginQueries();

  constructor() {}

  //Criação de Usuário
  createService = async (nomedeUsuario, senhadeUsuario, permissao, cpf, idSetor) => {
    //Validação de Dados
    var validLogin = loginValidator.loginValidator(cpf, senhadeUsuario);
    if (validLogin == false) {
      return { success: false };
    }
    //Criação de Usuario
    const fresult = await this.loginQueries.createLogin(
      nomedeUsuario,
      senhadeUsuario,
      permissao,
      cpf,
      idSetor
    );
    if (!fresult) {
      return false;
    }

    return true;
  };
  loginHandle = async (cpf, senhadeUsuario) => {
    //Validação de Dados
    var validLogin = loginValidator.loginValidator(cpf, senhadeUsuario);

    const fresult = await this.loginQueries.handleLogin(cpf, senhadeUsuario);
    console.log(fresult);
    return fresult;
  };
  getUsers = async () => {
    //encaminha o retorno de handleGetUserws para o controller

    const fresult = await this.loginQueries.handleGetUsers();

    return fresult;
  };
  passwordModifyService = async (
    idUsuario,
    senhadeUsuarioAtual,
    senhadeUsuarioNova
  ) => {
    const fresult = await this.loginQueries.modifyPassword(
      idUsuario,
      senhadeUsuarioAtual,
      senhadeUsuarioNova
    );

    return fresult;
  };
  deactivateService = async (idUsuario) => {
    const fresult = await this.loginQueries.deactivate(idUsuario);
    return fresult;
  };
}

module.exports = loginServices;
