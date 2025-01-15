const database = require("../configs/sequelize.js");
const Geral = require("./modelGerais.js");
const Ronda = require("./ModelRondas.js");

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

Usuarios.hasMany(Geral, { foreignKey: "idUsuario" });
Usuarios.hasMany(Ronda, { foreignKey: "idUsuario" });

module.exports = Usuarios;
