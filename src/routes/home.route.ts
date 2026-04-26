import express from 'express';
import { getHomeInformation } from '../controllers/home.controller.js';

const router = express.Router();

router.get('/', getHomeInformation);

export default router;
