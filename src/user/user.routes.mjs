import express from 'express';
import { permit } from '../middleware/role_check.mjs';
import { deleteById, getAll, getById, update } from './user.controller.mjs';

const router = express.Router();

router.route('/users').get(permit(['admin', 'manager']), getAll);

router
  .route('/user/:id')
  .get(permit(['admin', 'manager', 'developer']), getById)
  .put(permit(['admin', 'manager', 'developer']), update)
  .delete(permit(['admin', 'manager']), deleteById);

export default router;
