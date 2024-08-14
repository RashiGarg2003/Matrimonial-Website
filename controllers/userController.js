const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

// Helper function to validate email domain
const isValidEmailDomain = (email) => {
  const emailDomainRegex = /^[a-zA-Z0-9._%+-]+@gail\.co\.in$/;
  return emailDomainRegex.test(email);
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate email domain
    if (!isValidEmailDomain(email)) {
      return res.status(400).send('Invalid email domain. Please use your company email.');
    }

    const user = new User({ name, email, password });
    await user.save();

    res.redirect('/login');
  } catch (error) {
    console.log('Registration error:', error);
    res.status(500).send('Error registering user. Please try again.');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, authConfig.jwtSecret);  // Use the jwtSecret from the config
      res.cookie('token', token, { httpOnly: true });
      return res.redirect('/profile');
    }
    res.status(400).send('Invalid email or password');
  } catch (error) {
    console.log('Login error:', error);  // Log detailed error
    res.status(500).send('Error logging in. Please try again.');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
