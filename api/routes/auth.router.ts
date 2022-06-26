import * as express from "express";
import { User } from "../models/user";
import { AuthController } from "../controllers/auth-controllers";
import { config } from "../config";
const router = express.Router();
const authController = new AuthController();

// aca hago el login del user
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Faltan parametros en signInToken");
    }
    const signToken = await authController.singInToken(email, password);
    if (signToken) {
      return res.json(signToken);
    }
    throw new Error();
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/my-data", authController.authMiddleware, async (req, res) => {
  const { id } = req["_user"];
  const user = await User.findByPk(id);
  if (user) {
    return res.json(user);
  } else {
    return res.status(401).json();
  }
});

export default router;
