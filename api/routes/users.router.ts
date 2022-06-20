import * as express from "express";
import { AuthController } from "../controllers/auth-controllers";
import { UserController } from "../controllers/users-controllers";
import { User } from "../models";
const router = express.Router();
const userController = new UserController();
const authController = new AuthController();

//signup
router.post("/", async (req, res, next) => {
  const { email, fullname, password } = req.body;
  try {
    if (!email || !fullname) {
      throw new Error("Faltan parametros en signUpUser");
    }
    const newUser = await userController.signUpUser(email, fullname);
    const user_Id = newUser.get("id");
    const auth = await authController.signUpAuth(email, password, user_Id);
    return res.json({ registrado: true, newUser, auth });
  } catch (error) {
    return res.json(error.message);
  }
});

router.patch("/update", authController.authMiddleware, async (req, res) => {
  const { id } = req["_user"];
  if (!id) {
    return res.json({ error: "Falta el userId" });
  }
  if (req.body.fullname) {
    const newName = await userController.updateNameUser(id, req.body.fullname);
  }
  if (req.body.password) {
    const newPassword = await authController.updatePasswordUser(
      id,
      req.body.password
    );
  }
  return res.json("status: ok");
});

router.get("/my-pets", authController.authMiddleware, async (req, res) => {
  const { id } = req["_user"];
  if (!id) {
    return res.json({ error: "Falta el userId" });
  }
  const petsOfUser = await userController.findAllPetsOfUser(id);
  return res.json(petsOfUser);
});

router.post("/info-pet", async (req, res) => {
  if (!req.body) {
    return res.status(401).json("Faltan datos en el reporte");
  }
  const { emailOwner, title, message, cellphone, fullname } = req.body;
  const info = {
    message,
    cellphone,
    fullname,
  };
  const sendEmail = await userController.sendEmail(emailOwner, title, info);
  return res.json({ email: "enviado" });
});
export default router;
