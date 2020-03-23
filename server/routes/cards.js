const path = require('path');
const cardRouter = require('express').Router();

const cardsData = require(path.join(__dirname, '../data/cards.json'));

const cards = (req, res) => {
  res.send(cardsData);
};

cardRouter.get('/cards', cards);

module.exports = cardRouter;
