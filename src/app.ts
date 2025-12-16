import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { performance } from "node:perf_hooks";

export const startTime = performance.now();

const app: Application = express();
const route = "/api/v1";

app.use(cors({ origin: "*" }), express.json(), logger("dev"));

app.use(errorMiddleware);

export default app;
