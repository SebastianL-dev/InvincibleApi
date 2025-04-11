import express, { Router } from "express";
import { getAllCharacters } from "../controllers/character.controller.js";

/**
 * Character routes.
 * Handles GET requests to fetch all characters.
 */
const router: Router = express.Router();

router.get("/characters", getAllCharacters);

export default router;
