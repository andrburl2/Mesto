require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { PORT, MONGO_ADRESS } = require('./config');
const router = require('./routes/index');

mongoose.connect(MONGO_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    const app = express();

    app.listen(PORT, () => {});

    app.use(helmet());
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use('/', router);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Ошибка подключения к базе данных ${err}`);
  });
