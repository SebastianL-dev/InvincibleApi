import express from "express";
import {
  getAllSpecies,
  getSpeciesById,
} from "../controllers/species.controller.js";

const router = express.Router();

router.get("/species", getAllSpecies);
router.get("/species/:id", getSpeciesById);

export default router;
