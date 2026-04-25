import { Router } from 'express';
import { getAllLocations, getLocationById } from '../controllers/location.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { locationQuerySchema } from '../validators/location.validator.js';
import { paramsSchema } from '../validators/url.validator.js';

const router = Router();

router.get('/locations', validate({ query: locationQuerySchema }), getAllLocations);
router.get('/locations/:id', validate({ params: paramsSchema }), getLocationById);

export default router;
