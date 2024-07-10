const path = require('path');
const router = require('./app/routes/main');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
require('./app/configs/database.js');
const loggerMiddleware = require('./app/middlewares/logger.js');
require('./app/middlewares/globalErrorHandling.js');

app.use(express.static(path.join(__dirname, 'assets',)));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', router);
app.use(loggerMiddleware);



app.listen(3000, () => {
  console.log(`FileShelter API ${3000} !`);
});
