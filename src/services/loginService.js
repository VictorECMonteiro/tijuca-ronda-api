const { default: axios } = require("axios");
const loginQueries = require("../repositories/loginReposity");
const loginValidator = require("../validators/loginValidator");
const sharp = require("sharp");
require("dotenv").config();

class loginServices {
  loginQueries = new loginQueries();

  constructor() { }

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
  userDataModifyService = async (dados) => {
    const fresult = await this.loginQueries.modifyUserData(dados);


    return fresult;
  }
  deactivateService = async (idUsuario) => {
    const fresult = await this.loginQueries.deactivate(idUsuario);
    return fresult;
  };

  uploadProfilePicture = async (arquivos) => {
    
    let formData = new FormData()


    for (let i = 0; i <= filesUpload.length - 1; i++) {

      let compressedBuffer = await sharp(arquivos[i].buffer).jpeg({ quality: 50 }).toBuffer();

      formData.append(arquivos[i].originalname, compressedBuffer, {
        filename: arquivos[i].originalname,
        contentType: "image/jpeg",
      });
    }




    let resposta = await axios.post("http://192.168.9.249:5050/index.php", formData);
    


    if((JSON.parse(resposta)).success === true){
      return true
    }
    return false

    








  }






}

module.exports = loginServices;
