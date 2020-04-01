const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Не удается получить карточки' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message || 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (req.user._id.toString() === card.owner.toString()) {
          Card.deleteOne(card)
            .then(() => res.send(card));
        } else {
          res.status(401).send({ message: 'Нельзя удалить чужую карточку' });
        }
      } else {
        res.status(404).send({ message: 'Не удается найти карточку' });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ошибка при удаление карточки' }));
};
