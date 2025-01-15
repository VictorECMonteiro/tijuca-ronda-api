const database = require("../configs/sequelize.js");
const Geral = require("./modelGerais.js");
const Rotas = require("./ModelRotas.js");

const Local = database.sequelize.define("locais", {
  idLocal: {
    primaryKey: true,
    type: database.Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  nomeLocal: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },
});

Local.hasMany(Geral, {
  foreignKey: "idLocal",
});
Local.hasMany(Rotas, {
  foreignKey: "idLocal",
});

module.exports = Local;
