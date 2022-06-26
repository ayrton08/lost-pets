import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export interface AuthData {
  id: number;
  email: string;
  password: string;
  user_id: number;
}

export const Auth = sequelize.define("auth", {
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
});
