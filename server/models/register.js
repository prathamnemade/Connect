var mongoose = require('mongoose');

const RegisterSchema =new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  hash:{
    type: String,
    required: true
  },
  avatarLink: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    required: true
  }
});
mongoose.model('Register', RegisterSchema);