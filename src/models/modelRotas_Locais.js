const database = require("../configs/sequelize.js");
// const rotas = require("./ModelRotas.js")

const Rotas_Locais = database.sequelize.define("rotas_locais", {
    id:{
        primaryKey: true,
        type: database.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    horario:{
        type: database.Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Rotas_Locais