import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { speciesQuerySchema } from '../validators/species.validator.js';
import { getAllSpecies, getSpeciesById } from '../controllers/species.controller.js';
import { paramsSchema } from '../validators/url.validator.js';

const router = express.Router();

router.get('/species', validate({ query: speciesQuerySchema }), getAllSpecies);
router.get('/species/:id', validate({ params: paramsSchema }), getSpeciesById);

export default router;
