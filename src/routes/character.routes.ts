import { Router } from 'express';
import { getAllCharacters, getCharacterById } from '../controllers/character.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { characterQuerySchema } from '../validators/character.validator.js';
import { paramsSchema } from '../validators/url.validator.js';

const router = Router();

router.get('/characters', validate({ query: characterQuerySchema }), getAllCharacters);
router.get('/characters/:id', validate({ params: paramsSchema }), getCharacterById);

export default router;
