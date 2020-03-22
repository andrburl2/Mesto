const router = require('express').Router();
const users = require('./users.js');
const cards = require('./cards.js');
const error = require('./error.js');

router.get("/users", users.sendUsers);
router.get("/users/:id", users.findUser);
router.get("/cards", cards);
router.get("*", error);

module.exports = router;