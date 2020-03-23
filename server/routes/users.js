const path = require('path');
const userRouter = require('express').Router();

// eslint-disable-next-line import/no-dynamic-require
const usersData = require(path.join(__dirname, '../data/users.json'));

const sendUsers = (req, res) => {
  res.send(usersData);
};

const findUser = (req, res) => {
  const { id } = req.params;

  // eslint-disable-next-line no-underscore-dangle
  const user = usersData.find((el) => el._id === id);

  if (user) {
    res.send(user);
    return;
  }

  res.status(404).send({ message: 'Нет пользователя с таким id' });
};

userRouter.get('/', sendUsers);
userRouter.get('/:id', findUser);

module.exports = userRouter;
