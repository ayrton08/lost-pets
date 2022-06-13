import { User } from "../models";
import { Pets } from "../models";
import * as jwt from "jsonwebtoken";

export class UserController {
  constructor() {}
  async signUpUser(email: String, fullname: String) {
    const [newUser, createdUser] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        fullname,
        email,
      },
    });
    if (!createdUser) {
      throw new Error("Ya existe un usuario con el mail indicado");
    }
    return newUser;
  }

  async findAllPetsOfUser(id) {
    try {
      const allPets = await Pets.findAll({
        where: {
          UserId: id,
        },
      });
      return allPets;
    } catch (error) {
      return new Error("No pudimos encontrar todos los pets reportados");
    }
  }

  
}
