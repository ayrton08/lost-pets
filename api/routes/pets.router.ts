import * as express from "express";
import { index } from "../lib/algolia";
import { Pets, User } from "../models";
import { PetsController } from "../controllers/pets-controllers";
import { AuthController } from "../controllers/auth-controllers";
const authControllers = new AuthController();
const petsController = new PetsController();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allPets = await petsController.findAllPets();
    res.json(allPets);
  } catch (error) {
    next(error);
  }
});

router.get("/find-by-location", async (req, res, next) => {
  const { lat, lng } = req.query;
  try {
    const rta = await petsController.findClose(lat, lng);
    return res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/report-pet",
  authControllers.authMiddleware,
  async (req, res, next) => {
    const userId = req["_user"].id;
    try {
      const newPetData = {
        ...req.body,
        UserId: userId,
      };
      const newPet = await petsController.reportLostPet(newPetData);

      const id = newPet["id"];
      const { name, raza, state, lat, lng, location } = req.body;
      const algolia = await petsController.updateReportAlgolia(
        id,
        name,
        raza,
        state,
        lat,
        lng,
        userId,
        newPet["pictureURL"],
        location
      );
      return res.json(newPet);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/update/:id",
  authControllers.authMiddleware,
  async (req, res) => {
    const { id } = req.params;
    const data = await petsController.bodyToUpdate(req.body.dataForm);
    const pet = await Pets.update(data, {
      where: {
        id: id,
      },
    });
    const indexItem = petsController.bodyToIndex(req.body.dataForm, id);
    const algoliaRes = await index.partialUpdateObject(indexItem);
    return res.json(pet);
  }
);

router.get("/by-id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pets.findOne({
      where: {
        id: id,
      },
    });
    const userId = pet["user_id"];
    const user = await User.findByPk(userId);
    const emailUser = user["dataValues"]["email"];
    const rta = {
      ...pet["dataValues"],
      email: emailUser,
    };
    return res.json(rta);
  } catch (error) {
    return res.status(401).json("No se encontro la mascota");
  }
});

export default router;
