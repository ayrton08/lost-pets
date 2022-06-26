import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export interface UserData {
  id: number;
  fullname: string;
  email: string;
  pictureURL: string;
  lat: number;
  lng: number;
}

export const User = sequelize.define("user", {
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
  pictureURL: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
});
