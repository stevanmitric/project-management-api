import express from 'express';
import { getAll, getById, post, remove, update } from './client.controller.mjs';
const router = express.Router();

// router.use(permit(['admin', 'manager']));

router.route('/clients').post(post).get(getAll);

router.route('/client/:id').get(getById).put(update).delete(remove);

export default router;
