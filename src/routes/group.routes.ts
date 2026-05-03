import { Router } from 'express';
import { getAllGroups, getGroupById } from '../controllers/group.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { groupQuerySchema } from '../validators/group.validator.js';
import { paramsSchema } from '../validators/url.validator.js';

const router = Router();

router.get('/groups', validate({ query: groupQuerySchema }), getAllGroups);
router.get('/groups/:id', validate({ params: paramsSchema }), getGroupById);

export default router;
