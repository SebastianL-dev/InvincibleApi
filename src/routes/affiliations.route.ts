import express, { Router } from "express";
import {
  getAffiliationById,
  getAllAffiliations,
} from "../controllers/affiliation.controller.js";

/**
 * Affiliation routes.
 * Handles GET requests.
 * - Get all affiliations.
 * - Get an affiliation by its unique identifier.
 */
const router: Router = express.Router();

router.get("/affiliations", getAllAffiliations);
router.get("/affiliations/:id", getAffiliationById);

export default router;
