import express, { Router } from "express";
import {
  getAllCharacters,
  getCharacterById,
} from "../controllers/character.controller.js";

const router: Router = express.Router();

router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacterById);

export default router;
