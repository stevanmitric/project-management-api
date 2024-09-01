import express from 'express';
import {
  deleteById,
  getAll,
  getById,
  post,
  update,
} from './project.controller.mjs';

import { verifyToken } from '../middleware/authentication.mjs';

const router = express.Router();

router.use(verifyToken);

router.route('/project').post(post);

router.route('/projects').get(getAll);

router.route('/project/:id').get(getById).put(update).delete(deleteById);

export default router;
