require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Middleware to pass user to templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/', userRoutes);
app.use('/profile', auth, upload.single('profilePic'), profileRoutes);
app.use('/messages', auth, messageRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
