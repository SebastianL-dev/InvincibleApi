import express from "express";
import { getAllCharacters, getCharacterById, } from "../controllers/characters.controller.js";
const router = express.Router();
router.get("/characters", getAllCharacters);
router.get("/characters/:id", getCharacterById);
export default router;
