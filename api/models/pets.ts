import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export interface PetsData {
  id: number;
  name: string;
  raza: string;
  pictureURL: string;
  lat: number;
  lng: number;
  state: string;
  location: string;
  user_id: number;
}

export const Pets = sequelize.define("pet", {
  name: DataTypes.STRING,
  raza: DataTypes.STRING,
  pictureURL: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  state: DataTypes.STRING,
  location: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
});
