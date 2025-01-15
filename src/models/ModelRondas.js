const database = require("../configs/sequelize.js");
const Rotas = require("./ModelRotas.js");
const Geral = require("./modelGerais.js");

const Ronda = database.sequelize.define("rondas", {
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
  },
  idRota: {
    type: database.Sequelize.INTEGER,
  },
  //   idRota: {
  //     type: database.Sequelize.INTEGER,
  //     references: {
  //       model: Rotas,   // Referência à tabela Rotas
  //       key: "idRota",  // A chave primária de Rotas
  //     },
  //     allowNull: false,
  //   },
});

// Relação: Uma Ronda tem vários Gerais
Ronda.hasMany(Geral, { foreignKey: "idRonda" });

// Relação: Uma Ronda pertence a uma Rota
// Ronda.belongsTo(Rotas, {
//   foreignKey: "idRota", // Chave estrangeira em Rondas
//   as: "rota",
//   allowNull: false  // Alias para o relacionamento
// });

module.exports = Ronda;
