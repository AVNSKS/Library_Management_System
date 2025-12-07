// const { create } = require('../models/Books');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const authMiddleWare = require('../../middleWare/authMiddleWare');

const register = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    const existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashpass = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      userName,
      email,
      password: hashpass,
      role: 'STUDENT',
      createdAt: Date.now(),
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      'ITM',
      { expiresIn: '1hr' }
    );

    res.status(200).json({ message: 'userCeated Successfully', data: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profile = (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ message: 'User Profile fetched Successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, profile };
