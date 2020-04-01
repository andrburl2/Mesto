const userRouter = require('express').Router();
const {
  getUsers, findUser, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRouter.get('/', auth, getUsers);
userRouter.get('/:userId', auth, findUser);
userRouter.post('/signup', createUser);
userRouter.post('/signin', login);

module.exports = userRouter;
