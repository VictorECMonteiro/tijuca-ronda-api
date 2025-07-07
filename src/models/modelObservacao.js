const database = require("../configs/sequelize.js");




const Observacao = database.sequelize.define("observacao",{
        id:{
            primaryKey: true,
            type: database.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        observacao:{
            type: database.Sequelize.TEXT
        }





})



module.exports = Observacao