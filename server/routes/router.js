const router = require('express').Router();
const users = require('./users.js');
const cards = require('./cards.js');
const error = require('./error.js');

router
  .use('/users', users)
  .use('/cards', cards)
  .use('*', error);

module.exports = router;
