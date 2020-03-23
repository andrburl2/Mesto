const path = require('path');
const cardRouter = require('express').Router();

// eslint-disable-next-line import/no-dynamic-require
const cardsData = require(path.join(__dirname, '../data/cards.json'));

const cards = (req, res) => {
  res.send(cardsData);
};

cardRouter.get('/', cards);

module.exports = cardRouter;
