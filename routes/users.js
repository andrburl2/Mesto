const userRouter = require('express').Router();
const { getUsers, findUser } = require('../controllers/users');

const { validateObjectId } = require('../assets/joi-schemes');

userRouter.get('/', getUsers);
userRouter.get('/:userId', validateObjectId, findUser);

module.exports = userRouter;
