import { Sequelize, Model, DataTypes } from "sequelize";
import { config } from "../config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
  host: config.dbHost,
  ssl: true,
  // esto es necesario para que corra correctamente
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
