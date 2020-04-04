const router = require('express').Router();
const { errors } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const cards = require('./cards');
const users = require('./users');
const error = require('./error');

const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');
const { validateRegistration, validateLogin } = require('../assets/joi-schemes');

router.post('/signup', validateRegistration, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/cards', cards);
router.use('/users', users);
router.use(error);

router.use(errors());

router.use(errorHandler);

module.exports = router;
