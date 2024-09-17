import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import { Invite } from './model/invite.model.mjs';
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
  host: process.env.MAILGUN_HOST,
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export async function getAll(req, res) {
  try {
    const invites = await Invite.find().lean();

    return res.status(200).json(invites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function sendInvite(req, res) {
  try {
    const { email } = req.body;

    console.log('req', email);

    const message = {
      from: process.env.MAILGUN_FROM,
      to: email,
      subject: 'Task master invite',
      text: 'test',
    };

    await nodemailerMailgun.sendMail(message);

    return res.status(200).json({ message: 'Invite sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
