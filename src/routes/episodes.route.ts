import express, { Router } from "express";
import {
  getAllEpisodes,
  getEpisodeById,
} from "../controllers/episode.controller.js";

const router: Router = express.Router();

/**
 * Episode routes.
 * Handles GET requests.
 * - Get all episodes.
 * - Get a episode by its unique identifier.
 */
router.get("/episodes", getAllEpisodes);
router.get("/episodes/:id", getEpisodeById);

export default router;
