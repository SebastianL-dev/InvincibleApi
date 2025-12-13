import express, { Router } from "express";
import {
  getAllEpisodes,
  getEpisodeById,
} from "../controllers/episode.controller.js";

const router: Router = express.Router();

router.get("/episodes", getAllEpisodes);
router.get("/episodes/:id", getEpisodeById);

export default router;
