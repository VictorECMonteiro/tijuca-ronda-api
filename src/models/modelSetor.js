const sequelize = require("../configs/sequelize");
const modelUsuario = require("./modelUsuarios")
const modelLocal = require("./modelLocais")

const Setor = sequelize.sequelize.define("setor", 
    {
        idSetor:{
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomeSetor:{
            type: sequelize.Sequelize.STRING
        }

    }
);

Setor.hasMany(modelUsuario, {foreignKey: "idSetor"});
Setor.hasMany(modelLocal, {foreignKey: "idSetor"})



module.exports = Setor;

