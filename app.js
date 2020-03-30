const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, mongoAdress } = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(
  () => { app.listen(PORT, () => {}); },
  // eslint-disable-next-line no-console
  (err) => { console.log(err); },
);

app.use((req, res, next) => {
  req.user = {
    _id: '5e7b5a655fcb0e12f89a718a',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', require('./routes/error'));
