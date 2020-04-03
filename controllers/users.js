const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Не удается получить пользователей' }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (users) {
        res.send({ data: users });
      } else {
        res.status(404).send({ message: 'Не удается найти пользователя' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Неправильный запрос' }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.validate({
    name, about, avatar, email, password,
  })
    .then(() => bcrypt.hash(password, 10))
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({
        user: {
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch((err) => res.status(500).send({ message: err.message || 'Произошла ошибка' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });

      res.send(req.cookies.jwt);
    })
    .catch((err) => {
      res.status(401).send({ message: err.message || 'Произошла ошибка' });
    });
};
