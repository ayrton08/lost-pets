import * as express from "express";
import { index } from "../lib/algolia";
import { Pets } from "../models";
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
    res.json(rta);
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
      const { name, state, lat, lng } = req.body;
      const algolia = await petsController.updateReportAlgolia(
        id,
        name,
        state,
        lat,
        lng,
        userId,
        newPet["pictureURL"]
      );
      return res.json(newPet);
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await Pets.update(req.body, {
    where: {
      id: id,
    },
  });
  const indexItem = petsController.bodyToIndex(req.body, id);
  const algoliaRes = await index.partialUpdateObject(indexItem);
  res.json(pet);
});

export default router;
