require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  emailSecret: process.env.EMAIL_SECRET,
};

