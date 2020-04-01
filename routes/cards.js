const cardRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

cardRouter.get('/', auth, getCards);
cardRouter.post('/', auth, createCard);
cardRouter.delete('/:cardId', auth, deleteCard);

module.exports = cardRouter;
