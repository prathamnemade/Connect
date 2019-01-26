var mongoose = require('mongoose');
var crypto = require('crypto');
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
RegisterSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
mongoose.model('Register', RegisterSchema);