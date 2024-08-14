
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

// Render profile creation form
router.get('/create', auth, profileController.renderCreateProfileForm);

// Handle profile creation form submission
router.post('/create', auth, profileController.createProfile);

// Render profile display page
router.get('/', auth, profileController.viewProfile);

// Render search form
router.get('/search', auth, profileController.renderSearchForm);

// Handle search request
router.post('/search', auth, profileController.searchProfiles);

//to view searched profile
router.get('/:profileId', auth, profileController.viewSpecificProfile);

module.exports = router;

