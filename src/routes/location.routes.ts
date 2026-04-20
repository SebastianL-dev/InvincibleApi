import { Router } from 'express';
import { getAllLocations, getLocationById } from '../controllers/location.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { locationParamsSchema } from '../validators/location.validator.js';

const router = Router();

router.get('/locations', getAllLocations);
router.get('/locations/:id', validate({ params: locationParamsSchema }), getLocationById);

export default router;
