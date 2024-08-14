
const User = require('../models/User');
const sharp = require('sharp');  

// Render profile creation form
exports.renderCreateProfileForm = (req, res) => {
  res.render('createProfile', { user: req.user });
};

// Handle profile creation form submission
exports.createProfile = async (req, res) => {
  try {
    const {
      age, gender, bio, interests, dateOfBirth, height, maritalStatus,
      motherTongue, religion, city, pincode, department
    } = req.body;

    let profilePic = null;
    if (req.file) {
      const buffer = await sharp(req.file.path)
        .resize({ width: 200, height: 200 })
        .toBuffer();
      profilePic = `uploads/${Date.now()}-${req.file.originalname}`;
      await sharp(buffer).toFile(profilePic);
    }

    const user = await User.findById(req.user._id);
    user.profile = {
      age, gender, bio, interests: interests.split(','), profilePic,
      dateOfBirth, height, maritalStatus, motherTongue, religion, city, pincode, department
    };
    await user.save();

    res.render('/profile');
  } catch (error) {
    console.log('Profile creation error:', error);
    res.status(500).send('Error creating profile. Please try again.');
  }
};

// Render profile display page
exports.viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('profile');
    if (!user) {
      return res.status(404).send('Profile not found');
    }
    res.render('viewProfile', { user });
  } catch (error) {
    console.log('Profile display error:', error);
    res.status(500).send('Error displaying profile. Please try again.');
  }
};



// Render search form
exports.renderSearchForm = (req, res) => {
  res.render('searchProfiles', { profiles: [] });
};
// Handle search request
exports.searchProfiles = async (req, res) => {
  try {
    const { searchTerm, minAge, maxAge, gender, religion, state, location } = req.body;

    const searchCriteria = {
      ...(searchTerm && { $text: { $search: searchTerm } }),
      ...(minAge && { 'profile.age': { $gte: minAge } }),
      ...(maxAge && { 'profile.age': { $lte: maxAge } }),
      ...(gender && { 'profile.gender': gender }),
      ...(religion && { 'profile.religion': religion }),
      ...(state && { 'profile.state': state }),
      ...(location && { 'profile.location': location })
    };

    const profiles = await User.find(searchCriteria);
    res.render('searchResults', { profiles });
  } catch (error) {
    console.log('Profile search error:', error);
    res.status(500).send('Error searching profiles. Please try again.');
  }
};

//view specific profile
exports.viewSpecificProfile = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const user = await User.findById(profileId);
    if (!user) {
      return res.status(404).send('Profile not found');
    }
    res.render('viewProfile', { user });
  } catch (error) {
    console.log('Profile display error:', error);
    res.status(500).send('Error displaying profile. Please try again.');
  }
};

