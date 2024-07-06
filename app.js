const path = require('path');
const routes = require('./app/routes/main');
const axios = require('axios');

console.log(axios.isCancel('something'));

const express = require('express');
const app = express();
const db = require('./app/configs/database.js');

const port = 3000;
app.use(express.static('./assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => {
//   res.render('auth/auth')
// });
// app.get('/login', (req, res) => {
//   res.render('auth/login')
// });
app.use('/',routes)
app.listen(port, () => {
  console.log(`FileShelter API ${port} !`);
});
