import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import characterRoutes from "./routes/characters.route.js";

/**
 * Express app configuration.
 * Applies middleware and sets base API routes.
 */

const app: Application = express();
const route = "/api";

app.use(cors({ origin: "*" }), express.json(), logger("dev"));

app.use(route, characterRoutes);

export default app;
