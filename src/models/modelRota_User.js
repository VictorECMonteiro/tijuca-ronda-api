const database = require("../configs/sequelize.js");
// const rotas = require("./ModelRotas.js")

const Rota_User = database.sequelize.define("rota_user", {
    id:{
        primaryKey: true,
        type: database.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    }
})

module.exports = Rota_User