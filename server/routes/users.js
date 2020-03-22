const path = require('path');
const users = require(path.join(__dirname, '../data/users.json'));

const sendUsers = (req, res) => {
  res.send(users);
};

const findUser = (req, res) => {
  const id = req.params.id;

  const user = users.find(el => el._id === id);

  if (user) {
    res.send(user)
    return
  };

  res.status(404).send({ "message": "Нет пользователя с таким id" });
};

module.exports = {
  sendUsers,
  findUser
};