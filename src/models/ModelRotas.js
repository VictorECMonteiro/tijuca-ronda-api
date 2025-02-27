const database = require("../configs/sequelize.js");
// const Geral = require("./modelGerais.js");
const Rondas = require("./ModelRondas.js");
const modelRotas_Locais = require("./modelRotas_Locais.js")
const Usuarios = require("./modelUsuarios.js")



const Rotas = database.sequelize.define("rotas", {
  idRota: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true, // Adicionado para garantir que a chave primária está correta
    autoIncrement: true, // Se for o caso de ser auto-increment
  },
  nomeRota: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
  horarioInicio: {
    type: database.Sequelize.STRING,
    allowNull: false,
  }
});

// Rotas.hasMany(Rondas, {foreignKey: "idRota"})
Rotas.hasMany(modelRotas_Locais, {foreignKey: "idRota"})
// Rotas.hasMany(Usuarios, { foreignKey: "idUsuario", constraint: true})

module.exports = Rotas;
