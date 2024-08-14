const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profileSchema = new mongoose.Schema({
  bio: String,
  gender: { 
    type: String,
    enum: ['Male', 'Female'],
    required: true },
  age: Number,
  dateOfBirth: Date,
  maritalStatus:{
    type: String,
    enum: ['Single', 'Divorced', 'Awaiting Divorce' , 'Widowed'],
    required: true },
  motherTongue: {
      type: String,
      enum: [
        'Hindi', 'Awadhi', 'Bhojpuri', 'Garhwali', 'Punjabi', 'Bihari', 'Rajasthani', 
        'Haryanvi', 'Himachali/Pahari', 'Kashmiri/Dogri', 'Sindhi', 'Urdu', 'Marathi', 
        'Gujrati', 'Kuchi', 'Konkani', 'Hindi/Madhya Pradesh/Bundelkhand/Chattisgarhi', 
        'Tamil', 'Telugu', 'Kannada', 'Malyalam', 'Tulu', 'Bengali', 'Oriya', 
        'Assamese', 'Sikkim/Nepali/Lepdha/Bhutia/Limbu', 'English'
      ]
    },
  religion: {
      type: String,
      enum: ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Buddhist', 'Jain', 'Parsi', 'Jewish']
    },
  
  
  interests: [String],
  height: Number,
  state: String,
  city: String,
  pincode: String,
  location: String,
  department:String,
  profilePic: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: profileSchema,
  isVerified: { type: Boolean, default: true }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
