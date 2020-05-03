const userRouter = require('express').Router();
const { getUsers, findUser } = require('../controllers/users');

const { validateObjectId } = require('../assets/joi-schemes');

userRouter.get('/', getUsers);
userRouter.get('/:id', validateObjectId, findUser);

module.exports = userRouter;
