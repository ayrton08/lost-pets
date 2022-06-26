import * as express from "express";
import * as path from "path";
import { routerApi } from "./routes";
import * as cors from "cors";
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
const staticDir = path.resolve(__dirname, "../dist");

app.use(
  express.json({
    limit: "50mb",
  })
);

app.listen(port, () => {
  console.log(`Estoy funcionando en el puerto ${port}`);
});

app.get("/test", async (req, res) => {
  res.json({ status: "ok" });
});

routerApi(app);

app.use(express.static("dist"));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
