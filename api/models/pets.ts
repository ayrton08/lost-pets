import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Pets extends Model {}
Pets.init(
  {
    name: DataTypes.STRING,
    raza: DataTypes.STRING,
    pictureURL: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    state: DataTypes.STRING,
  },
  { sequelize, modelName: "Pet" }
);
