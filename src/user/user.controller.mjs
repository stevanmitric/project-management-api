import bcrypt from 'bcrypt';
import {
  comparePassword,
  generateToken,
} from '../middleware/authentication.mjs';
import { User } from './model/user.model.mjs';

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'User not found.' });

    const passwordCheck = await comparePassword(password, user.password);

    if (!passwordCheck)
      return res.status(401).json({ message: 'Invalid password' });

    const token = generateToken(user);

    req.user = user;

    return res.status(200).json({
      message: 'Auth successful',
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function register(req, res) {
  try {
    console.log('req.body register', req.body);

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email: email });

    if (user)
      return res
        .status(409)
        .json({ message: 'User with this email already exists.' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match.' });

    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName,
      lastName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getAll(req, res) {
  const filters =
    req.query && req.query.filter ? JSON.parse(req.query.filter) : {};
  const sorter =
    req.query && req.query.sorter
      ? JSON.parse(req.query.sorter)
      : { createdAt: 1 };
  const skip = req.query && req.query.offset ? Number(req.query.offset) : 0;
  const select =
    req.query && req.query.select ? JSON.parse(req.query.select) : {};
  try {
    const users = await User.find(filters)
      .sort(sorter)
      .skip(skip)
      .select(select)
      .lean();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    const user = await User.findOne({ _id: id });

    if (!user) return res.status(404).json({ message: 'User not found.' });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    const data = req.body;

    const user = await User.findOne({ _id: id });

    if (!user) return res.status(404).json({ message: 'User does not exist.' });

    await User.updateOne({ _id: id }, { ...data });

    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function deleteById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(401).json({ message: 'Wrong id format.' });
    }

    await User.deleteOne({ _id: id });

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
