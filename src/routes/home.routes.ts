import { Router } from 'express';
import { getHomeInformation } from '../controllers/home.controller.js';

const router = Router();

router.get('/', getHomeInformation);

export default router;
