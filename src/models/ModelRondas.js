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
    allowNull: false,
  },
  horaFim: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  observacao: {
    type: database.Sequelize.STRING,
  }
});

// Relação: Uma Ronda tem vários Gerais
Ronda.hasMany(Geral, { foreignKey: "idRonda"});
Ronda.belongsTo(Rotas, {constraint: true, foreignKey: "idRota"});


module.exports = Ronda;
