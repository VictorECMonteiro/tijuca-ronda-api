const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize("tijucaronda", process.env.dbUser, process.env.dbKey, {
  timezone: "-03:00",
  host: process.env.ipDb,
  dialect: process.env.dbType,
  port: process.env.dbPort,
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(async () => {
    sequelize.sync()
    // const root = await sequelize.query("SELECT * FROM usuarios WHERE permissao = 'admin';", {
    //   Type: Sequelize.QueryTypes.SELECT
    // })

    // sequelize.query("INSERT INTO 'usuarios' VALUES('root', 'admin', 'admin', 1, 0)")




    console.log("Connectado");
  })
  .catch((e) => {
    console.log(e);
  });

// sequelize.sync({force: true});   

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
