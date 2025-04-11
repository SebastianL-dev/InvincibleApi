import express, { Router } from "express";
import { getAllCharacters } from "../controllers/character.controller.js";

const router: Router = express.Router();

router.get("/characters", getAllCharacters);

export default router;
