const path = require('path');
const userRouter = require('express').Router();

const usersData = require(path.join(__dirname, '../data/users.json'));

const sendUsers = (req, res) => {
  res.send(usersData);
};

const findUser = (req, res) => {
  const id = req.params.id;

  const user = usersData.find((el) => el._id === id);

  if (user) {
    res.send(user);
    return;
  }

  res.status(404).send({ message: 'Нет пользователя с таким id' });
};

userRouter.get('/users', sendUsers);
userRouter.get('/users/:id', findUser);

module.exports = userRouter;
