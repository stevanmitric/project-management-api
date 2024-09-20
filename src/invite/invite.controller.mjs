import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Invite } from './model/invite.model.mjs';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere',
});

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

    mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.MAILGUN_FROM,
      to: email,
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!',
      html: '<h1>Testing some Mailgun awesomeness!</h1>',
    });

    return res.status(200).json({ message: 'Invite sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}
