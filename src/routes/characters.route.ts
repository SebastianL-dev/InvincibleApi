import express, { Router } from "express";
import {
  getAllCharacters,
  getCharacterById,
} from "../controllers/character.controller.js";

/**
 * Character routes.
 * Handles GET requests.
 * - Get all characters.
 * - Get a character by its unique identifier.
 */
const router: Router = express.Router();

router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacterById);

export default router;
