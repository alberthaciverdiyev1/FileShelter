const path = require('path');
const router = require('./app/routes/main');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
require('./app/configs/database.js');
require('./app/middlewares/logger.js');

app.use(express.static(path.join(__dirname, 'assets',)));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);

process.on('uncaughtException', (err) => {
  logger.error({
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    message: 'Unhandled Rejection',
    reason: reason,
    promise: promise,
  });
});

app.listen(3000, () => {
  console.log(`FileShelter API ${3000} !`);
});
