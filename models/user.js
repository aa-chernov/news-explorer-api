const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');
const constants = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: constants.NOT_EMAIL,
    },
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(constants.USER_DATA_ERROR));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(constants.USER_DATA_ERROR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
