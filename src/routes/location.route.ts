import express, { Router } from "express";
import {
  getAllLocations,
  getLocationById,
} from "../controllers/location.controller.js";

const router: Router = express.Router();

router.get("/locations", getAllLocations);
router.get("/locations/:id", getLocationById);

export default router;
