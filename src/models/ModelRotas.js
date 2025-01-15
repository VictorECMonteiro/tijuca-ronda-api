const database = require("../configs/sequelize.js");
const Geral = require("./modelGerais.js");
const Rondas = require("./ModelRondas.js");

const Rotas = database.sequelize.define("rotas", {
  idRota: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    primaryKey: false, // Adicionado para garantir que a chave primária está correta
    autoIncrement: false, // Se for o caso de ser auto-increment
  },
  nomeRota: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  horarioInicio: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Rotas;
