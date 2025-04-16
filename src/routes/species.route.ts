import express, { Router } from "express";
import {
  getAllSpecies,
  getSpeciesById,
} from "../controllers/species.controller.js";

const router: Router = express.Router();

router.get("/species", getAllSpecies);
router.get("/species/:id", getSpeciesById);

export default router;
