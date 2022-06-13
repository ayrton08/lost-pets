import * as express from "express";
import { index } from "../lib/algolia";
import { Pets } from "../models";
import { PetsController } from "../controllers/pets-controllers";
const petsCrontroller = new PetsController();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allPets = await petsCrontroller.findAllPets();
    res.json(allPets);
  } catch (error) {
    next(error);
  }
});

router.get("/find-by-location", async (req, res, next) => {
  const { lat, lng } = req.query;
  try {
    const rta = await petsCrontroller.findClose(lat, lng);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.post("/report-pet", async (req, res, next) => {
  try {
    const newPet = await petsCrontroller.reportLostPet(req.body);
    const id = newPet["id"];
    const { name, state, lat, lng } = req.body;
    const algolia = await petsCrontroller.updateReportAlgolia(
      id,
      name,
      state,
      lat,
      lng
    );

    return res.json(newPet);
  } catch (error) {
    next(error);
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const pet = await Pets.update(req.body, {
    where: {
      id: id,
    },
  });
  const indexItem = petsCrontroller.bodyToIndex(req.body, id);
  const algoliaRes = await index.partialUpdateObject(indexItem);
  res.json(pet);
});

export default router;
