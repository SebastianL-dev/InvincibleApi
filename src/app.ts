import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { performance } from "perf_hooks";
import charactersRoute from "./routes/characters.route.js";
import homeRoute from "./routes/home.route.js";

// Import mongoose models to populate properly.
import "./models/location.model.js";
import "./models/species.model.js";

export const startTime = performance.now();

const app: Application = express();
const route = "/api";

app.use(cors({ origin: "*" }), express.json(), logger("dev"));

app.use(route, charactersRoute);
app.use(route, homeRoute);

app.use(errorMiddleware);

export default app;
