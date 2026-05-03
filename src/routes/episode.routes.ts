import { Router } from 'express';
import { getAllEpisodes, getEpisodeById } from '../controllers/episode.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { episodeQuerySchema } from '../validators/episode.validator.js';
import { paramsSchema } from '../validators/url.validator.js';

const router = Router();

router.get('/episodes', validate({ query: episodeQuerySchema }), getAllEpisodes);
router.get('/episodes/:id', validate({ params: paramsSchema }), getEpisodeById);

export default router;
