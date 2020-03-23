const express = require('express');
const path = require('path');

const router = require('./routes/router');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', router);

app.listen(PORT, () => {

});
