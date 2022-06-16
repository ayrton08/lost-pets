import { Auth, User } from "../models";
import { Pets } from "../models";

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
          user_id: id,
        },
      });
      return allPets;
    } catch (error) {
      return new Error("No pudimos encontrar todos los pets reportados");
    }
  }

  async updateNameUser(id, fullname) {
    try {
      const user = await User.update(fullname, {
        where: {
          id: id,
        },
      });
      return;
    } catch (error) {
      return new Error("No pudimos actualizar el nombre");
    }
  }
  
}
