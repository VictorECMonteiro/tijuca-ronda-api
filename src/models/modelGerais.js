const database = require("../configs/sequelize.js");
// const Rotas = require("./modelRotas")

const Geral = database.sequelize.define("gerais", {
  idGeral: {
    type: database.Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  idRota: {
    type: database.Sequelize.INTEGER,
    allowNull: true,
  },
  latitude: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  longitude: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  hora: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Geral;
