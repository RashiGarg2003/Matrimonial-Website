const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, authConfig.jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.redirect('/login');
    }

    req.user = user;
    res.locals.currentUser = user;
    res.locals.hasProfile = Boolean(user.profile && user.profile.age);  
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

module.exports = auth;



