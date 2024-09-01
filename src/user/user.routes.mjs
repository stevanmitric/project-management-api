import express from 'express';
import {
  deleteById,
  getAll,
  getById,
  login,
  register,
  update,
} from './user.controller.mjs';

import { verifyToken } from '../middleware/authentication.mjs';

const router = express.Router();

router.use(verifyToken);

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/users').get(getAll);

router.route('/user/:id').get(getById).put(update).delete(deleteById);

export default router;
