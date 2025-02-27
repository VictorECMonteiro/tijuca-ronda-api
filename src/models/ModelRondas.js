const database = require("../configs/sequelize.js");
const Geral = require("./modelGerais.js");
const Rotas = require("./ModelRotas.js");

var Ronda = database.sequelize.define("rondas", {
  idRonda: {
    primaryKey: true,
    type: database.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true, // Garantindo que seja auto-incremento
  },
  nomeRota: {
    type: database.Sequelize.STRING,
  },
  horaInicio: {
    type: database.Sequelize.STRING,
    allowNull: true,
  },
  horaFim: {
    type: database.Sequelize.STRING,
    allowNull: true,
  },
  data: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  observacao: {
    type: database.Sequelize.STRING,
  },
  status:{
    type: database.Sequelize.INTEGER,

  }
});

// Relação: Uma Ronda tem vários Gerais
Ronda.hasMany(Geral, { foreignKey: "idRonda"});
Ronda.belongsTo(Rotas, {constraint: true, foreignKey: "idRota"});

// Ronda.sync()

module.exports = Ronda;
