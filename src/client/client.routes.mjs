import express from 'express';
import { verifyToken } from '../middleware/authentication.mjs';
import { getAll, getById, post, remove, update } from './client.controller.mjs';
const router = express.Router();

router.use(verifyToken);

router.route('/clients').post(post).get(getAll);

router.route('/client/:id').get(getById).put(update).delete(remove);

export default router;
