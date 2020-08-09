const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');

/*
email — почта пользователя, по которой он регистрируется.
        Это обязательное поле, уникальное для каждого пользователя.
        Также оно должно валидироваться на соответствие схеме электронной почты.

password — хеш пароля. Обязательное поле-строка.
          Нужно задать поведение по умолчанию, чтобы база данных не возвращала это поле.

name — имя пользователя, например: Александр или Мария.
        Это обязательное поле-строка от 2 до 30 символов.
*/

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный формат почты',
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
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
