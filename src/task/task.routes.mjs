import express from 'express';
import {
  createTaskList,
  deleteById,
  deleteListById,
  getAll,
  getById,
  getTaskLists,
  post,
  update,
} from './task.controller.mjs';

import { verifyToken } from '../middleware/authentication.mjs';

const router = express.Router();

router.use(verifyToken);

router.route('/tasks').get(getAll).post(post);

router.route('/task/:id').get(getById).put(update).delete(deleteById);

router.route('/lists').get(getTaskLists).post(createTaskList);

router.route('/list/:id').delete(deleteListById);

export default router;
