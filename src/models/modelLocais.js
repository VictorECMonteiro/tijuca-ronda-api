const database = require("../configs/sequelize.js");
const Geral = require("./modelGerais.js");
// const Rotas = require("./ModelRotas.js");
const Rotas_Locais = require("../models/modelRotas_Locais.js")

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
Local.hasMany(Rotas_Locais, {
  foreignKey: "idLocal",
});

module.exports = Local;
