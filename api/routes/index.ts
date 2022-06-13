import * as express from "express";
import routerUser from "./users.router";
import routerPets from "./pets.router";
import routerAuth from "./auth.router";

export function routerApi(app) {
  const routerMain = express.Router();
  app.use("/api/v1", routerMain);
  routerMain.use("/users", routerUser);
  routerMain.use("/pets", routerPets);
  routerMain.use("/auth", routerAuth);
}
