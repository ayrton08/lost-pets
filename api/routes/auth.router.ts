import * as express from "express";
import { User } from "../models/user";
import { AuthController } from "../controllers/auth-controllers";
import { config } from "../config";
const router = express.Router();
const secret = config.secretValidator;
const authController = new AuthController();
// signup

router.post("/", async (req, res, next) => {});

// aca hago el login del user
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Faltan parametros en signInToken");
  }

  try {
    const signToken = await authController.singInToken(email, password);
    if (signToken) {
      console.log("soy el token", signToken);
      return res.json(signToken);
    }
    throw new Error();
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/my-data", authController.authMiddleware, async (req, res) => {
  const id = req["_user"]["user"].id;
  const user = await User.findByPk(id);
  res.json(user);
});

export default router;
