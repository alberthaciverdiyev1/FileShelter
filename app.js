const path = require('path');
const router = require('./app/routes/main');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

require('./app/configs/database.js');
require('./app/middlewares/globalErrorHandling.js');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

if (!process.env.IS_PRODUCTION) {
  const loggerMiddleware = require('./app/middlewares/logger.js');
  app.use(loggerMiddleware);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// handleSocketConnection(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`FileShelter API running on port ${PORT}!`);
});
