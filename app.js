const path = require('path');
const router = require('./app/routes/main');
const express = require('express');
const app = express();
const db = require('./app/configs/database.js');

const port = 3000;
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log(`FileShelter API ${port} !`);
});
