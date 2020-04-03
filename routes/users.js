const userRouter = require('express').Router();
const { getUsers, findUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', findUser);

module.exports = userRouter;
