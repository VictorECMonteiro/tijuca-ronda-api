const database = require("../configs/sequelize.js");
const Geral = require("./modelGerais.js");
const Ronda = require("./modelRondas.js");
const Rota = require("./modelRotas.js")
const Rota_User = require("./modelRota_User.js")

const Usuarios = database.sequelize.define("usuarios", {
  idUsuario: {
    type: database.Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  cpf: {
    type: database.Sequelize.STRING,
    allowNull: false,
    autoIncrement: false,
  },
  nomedeUsuario: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  senhadeUsuario: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  permissao: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
  },
});


// Usuarios.hasMany(Rota, {foreignKey: "idUsuario"})
Usuarios.hasMany(Geral, { foreignKey: "idUsuario" });
Usuarios.hasMany(Ronda, { foreignKey: "idUsuario" });
Usuarios.hasMany(Rota_User, { foreignKey: "idUsuario" });

module.exports = Usuarios;
