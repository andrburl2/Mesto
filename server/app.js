const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {
    _id: '5e7b5a655fcb0e12f89a718a',
  };

  next();
});

app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {

});
