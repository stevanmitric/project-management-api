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

const router = express.Router();

router.route('/tasks').get(getAll).post(post);

router.route('/task/:id').get(getById).put(update).delete(deleteById);

router.route('/lists').get(getTaskLists).post(createTaskList);

router.route('/list/:id').delete(deleteListById);

export default router;
