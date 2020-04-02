const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const cards = require('./cards');
const users = require('./users');
const sendError = require('./error');

const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/cards', cards);
router.use('/users', users);

router.use(sendError);

module.exports = router;
