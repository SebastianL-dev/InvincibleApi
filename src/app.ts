import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";

const app: Application = express();

app.use(cors({ origin: "*" }), express.json(), logger("dev"));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

export default app;
