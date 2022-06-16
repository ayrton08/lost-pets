import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Auth } from "../models/auth";
import { config } from "../config";
import { User } from "../models";
const secret = config.secretValidator;

export class AuthController {
  constructor() {}

  getSHA256ofString(text: string) {
    return crypto.createHash("sha256").update(text).digest("hex");
  }

  authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, secret);
      req["_user"] = data;
      console.log("soy la data", data);
      next();
    } catch (error) {
      res.status(401).json(error);
    }
  }

  async singInToken(email, password) {
    const passwordHash = this.getSHA256ofString(password);
    const auth = await Auth.findOne({
      where: {
        email,
        password: passwordHash,
      },
    });
    if (!auth) {
      throw new Error("contraseña incorrecta");
    }
    const id = Number(auth.get("user_id"));
    const user = await User.findByPk(id);
    const token = jwt.sign(user["dataValues"], "estoesunsecreto");
    return token;
  }

  async signUpAuth(email, password, user_id) {
    const [auth, createdAuth] = await Auth.findOrCreate({
      where: {
        user_id,
      },
      defaults: {
        email,
        password: this.getSHA256ofString(password),
        user_id,
      },
    });
    return auth;
  }

  async updatePasswordUser(id, password) {
    // const passwordHash = this.getSHA256ofString(password);
    try {
      const auth = await Auth.update(password, {
        where: {
          id: id,
        },
      });
      return;
    } catch (error) {
      return new Error("No pudimos actualizar el password");
    }
  }
}
