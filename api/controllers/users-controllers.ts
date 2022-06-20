import { Auth, User } from "../models";
import { Pets } from "../models";
import * as sgMail from "@sendgrid/mail";
import { config } from "../config";

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
      const user = await User.update(
        { fullname },
        {
          where: {
            id: id,
          },
        }
      );
      return user;
    } catch (error) {
      return new Error("No pudimos actualizar el nombre");
    }
  }
  async sendEmail(email, title, info) {
    try {
      sgMail.setApiKey(config.sendGrid);
      const msg = {
        to: email, // Change to your recipient
        from: "ayrtonjuarez90@gmail.com", // Change to your verified sender
        subject: title,
        html: `Mi nombre es ${info.fullname}, y mi telefono es ${info.cellphone}. Reporte: ${info.message}`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    } catch (error) {
      return new Error("No pudimos actualizar el nombre");
    }
  }
}
