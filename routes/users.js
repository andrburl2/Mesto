const userRouter = require('express').Router();
const { getUsers, findUser, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', findUser);
userRouter.post('/', createUser);

module.exports = userRouter;
