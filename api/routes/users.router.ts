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

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.update(req.body, {
    where: {
      id: id,
    },
  });
  res.json(user);
});

//login
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await userController.loginUser(id);
//   res.json(user);
// });
export default router;
