const mongooes = require('mongoose');
const validator = require('validator');

const userSchema = new mongooes.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Your name cannot exeeds 30 charachters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: [true, 'This email is already exists'],
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Your password should be more than 6 charachters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswoordExpire: Date,
});
module.exports = mongooes.model('user', userSchema);
