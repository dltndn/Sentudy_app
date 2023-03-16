require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");
const env = process.env;




exports.dataBase = () => {
  const dataBase = new Sequelize("sentudy", env.user, env.password, {
    dialect: "mariadb",
    host: env.host,
    port: env.port,
  });
  return dataBase
}