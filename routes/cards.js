const cardRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

const { validatecard } = require('../assets/joi-schemes');

cardRouter.get('/', getCards);
cardRouter.post('/', validatecard, createCard);
cardRouter.delete('/:cardId', deleteCard);

module.exports = cardRouter;
