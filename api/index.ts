import * as express from "express";
import * as path from "path";
import { routerApi } from "./routes";
import * as cors from "cors";
const port = process.env.PORT || 3000;
const app = express();
const staticDir = path.resolve(__dirname, "../dist");

const whitelist = [
  "http://localhost:1234",
  "https://apx-dwf-m8.firebaseapp.com/",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

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
