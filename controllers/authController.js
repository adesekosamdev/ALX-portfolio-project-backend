// controllers/authController.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistedTokens = require('../middleware/blacklist')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const username = "";
    const user = await User.create({ username, email, password });
    console.log('Registration successful');
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '12h'
    });
    console.log('Login successful');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
	try {
		const token = req.header('Authorization').split(' ')[1];
		blacklistedTokens.push(token);
    console.log('Logout successful');
		res.json({ message: 'Logged out successfully' });
	} catch (error) {
      res.status(500).json({ error: error.message });
  }
};
