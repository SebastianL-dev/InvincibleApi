import express, { Router } from "express";
import {
  getAffiliationById,
  getAllAffiliations,
} from "../controllers/affiliation.controller.js";

const router: Router = express.Router();

router.get("/affiliations", getAllAffiliations);
router.get("/affiliations/:id", getAffiliationById);

export default router;
