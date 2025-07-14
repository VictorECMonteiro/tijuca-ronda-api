const registroVigia = require("../models/modelUsuarios");
const bcrypt = require("bcrypt");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const { where } = require("sequelize");

class loginQueries {
  constructor() {}
  //Lida com a Query de criar login de usuario(Admin)
  createLogin = (nomedeUsuario, senhadeUsuario, permissao, cpf, idSetor) => {
    //Cria login de usuário com criptografia no banco
    try {
      //Gera criptografia a partir da senha fornecida
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(senhadeUsuario, salt, (err, hash) => {
          console.log(nomedeUsuario);
          //Faz a Query de insertção no banco de dados
          registroVigia
            .create({
              nomedeUsuario: nomedeUsuario.toLowerCase(),
              senhadeUsuario: hash,
              permissao: permissao,
              cpf: cpf,
              status: 1,
              idSetor: idSetor
            })
            .then(() => {
              return true;
            })
            .catch((e) => {
              return false;
            });
        });
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  //Lida com a Query de login de usuario
  handleLogin = async (cpf, senhadeUsuario) => {
    //Lida com o login
    // Codigo 1: Erro no try/catch,
    // Codigo 2: Erro ao efetuar a query no banco
    // Codigo 3: Senha Incorreta

    try {
      //Procura o Usuário no banco de dados pelo nome
      const user = await registroVigia.findOne({
        where: {
          cpf: cpf,
        },
      });
      console.log(senhadeUsuario);
      if (!user) {
        return { success: false, err: 3, msg: "Usuario ou senha incorreta" };
      }
      //Caso ache, compara a senha criptografada do banco com a senha fornecida
      const authResult = await bcrypt.compare(
        senhadeUsuario,
        user.senhadeUsuario
      );
      //Se a senha nao for verdadeira
      if (!authResult) {
        return { success: false, err: 3, msg: "Usuário ou Senha Incorreta" };
      }
      //Se a senha for verdadeira
      else {
        //Gera token acesso a API
        const token = jwt.sign(
          { nomedeUsuario: user.senhadeUsuario },
          process.env.tokenKey,
          { expiresIn: "24h" }
        );
        //Monta json de resposta
        const resultadoFinal = {
          success: true,
          nomedeUsuario: user.nomedeUsuario,
          idUsuario: user.idUsuario,
          permissao: user.permissao,
          status: user.status,
          token: token,
        };
        return resultadoFinal;
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        err: 1,
        msg: "Erro nao identificado, contate o administrador",
      };
    }
  };
  handleGetUsers = async () => {
    //Pega todos os usuários do banco de dados e devolve para o service
    try {
      const fresult = await registroVigia.findAll();

      return fresult;
    } catch (e) {
      console.log(e);
    }
  };

  modifyPassword = async (
    idUsuario,
    senhadeUsuarioAtual,
    senhadeUsuarioNova
  ) => {
    try {
      const fresult = await registroVigia.findOne({
        where: {
          idUsuario: idUsuario,
        },
      });

      const authResult = await bcrypt.compare(
        senhadeUsuarioAtual,
        fresult.senhadeUsuario
      );

      console.log(authResult);
      console.log("VERIFIQUEI SENHA");
      if (!authResult) {
        return {
          success: false,
          msg: "Senha Incorreta",
        };
      }
      console.log("IREI GERAR A NOVA SENHA");
      const hashedPassword = await bcrypt.hash(senhadeUsuarioNova, 10);
      await registroVigia.update(
        { senhadeUsuario: hashedPassword },
        { where: { idUsuario: idUsuario } }
      );

      return { success: true, msg: "Senha alterada com sucesso" };
    } catch (e) {
      console.log(e);
      return { success: false, msg: "Erro ao alterar senha" };
    }
  };

  modifyUserData = async (dados) =>{
    try{
      for (let key in dados) {
        if (dados[key]) {
          json[key.toString()] = dados[key];
        }
      }
      registroVigia.update(json, {where:{idUsuario:dados.idUsuario}})
      return true
      }
      catch(E){
        return false
      }
  }

  deactivate = async (idUsuario) => {
    try {
      const fresult = await registroVigia.update(
        { status: 0 },
        { where: { idUsuario: idUsuario } }
      );
      console.log(fresult);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}

module.exports = loginQueries;
