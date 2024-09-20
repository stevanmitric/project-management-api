import express from 'express';
import { permit } from '../middleware/role_check.mjs';
import {
  deleteById,
  getAll,
  getById,
  post,
  update,
} from './project.controller.mjs';

const router = express.Router();

router.route('/project').post(permit(['admin', 'manager']), post);

router
  .route('/projects')
  .get(permit(['admin', 'manager', 'developer']), getAll);

router
  .route('/project/:id')
  .get(permit(['admin', 'manager', 'developer']), getById)
  .put(permit(['admin', 'manager', 'developer']), update)
  .delete(permit(['admin', 'manager']), deleteById);

export default router;
