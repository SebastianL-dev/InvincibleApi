import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import characterRoutes from "./routes/characters.route.js";
import episodeRoutes from "./routes/episodes.route.js";
import speciesRoutes from "./routes/species.route.js";
import locationRoutes from "./routes/location.route.js";
import affiliationRoutes from "./routes/affiliations.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { performance } from "node:perf_hooks";

export const startTime = performance.now();

/**
 * Express app configuration and redis configuration.
 * Applies middleware and sets base API routes.
 */

const app: Application = express();
const route = "/api";

app.use(cors({ origin: "*" }), express.json(), logger("dev"));

app.use(route, characterRoutes);
app.use(route, episodeRoutes);
app.use(route, speciesRoutes);
app.use(route, locationRoutes);
app.use(route, affiliationRoutes);

app.use(errorMiddleware);

export default app;
