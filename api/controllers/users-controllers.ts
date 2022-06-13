import { User } from "../models/user";

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
}
