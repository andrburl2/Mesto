const path = require('path');
const cards = require(path.join(__dirname, '../data/cards.json'));

const sendCards = (req, res) => {
  res.send(cards);
};

module.exports = sendCards;