import express from 'express';
import { getAll, sendInvite } from './invite.controller.mjs';
const router = express.Router();

// router.use(permit(['admin', 'manager']));

router.route('/invites').get(getAll).post(sendInvite);

export default router;
