const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize("tijucaronda", "root", "", {
  timezone: "-03:00",
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connectado");
  })
  .catch((e) => {
    console.log(e);
  });

// sequelize.sync({ force: true });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
