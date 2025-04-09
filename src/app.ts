import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";

/**
 * Create main Express application.
 */
const app: Application = express();

// Server configuration
app.use(cors({ origin: "*" }), express.json(), logger("dev"));

// Server routes
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

export default app;
