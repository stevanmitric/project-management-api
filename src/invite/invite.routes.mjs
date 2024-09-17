import express from 'express';
import { verifyToken } from '../middleware/authentication.mjs';
import { getAll, sendInvite } from './invite.controller.mjs';
const router = express.Router();

router.use(verifyToken);

router.route('/invites').get(getAll).post(sendInvite);

export default router;
