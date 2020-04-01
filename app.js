const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

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

app.use(cookieParser());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('*', require('./routes/error'));
