const path = require('path');
const router = require('./app/routes/main');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const messageService = require('./app/services/messageService');
const jwt = require('jsonwebtoken');


require('./app/configs/database.js');
require('./app/middlewares/globalErrorHandling.js');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = require('./app/middlewares/logger.js');
  app.use(loggerMiddleware);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Socket.IO bağlantısını yönetmek için fonksiyonu çağır
handleSocketConnection(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`FileShelter API running on port ${PORT}!`);
});

// Socket.IO bağlantılarını ele alan fonksiyon
function handleSocketConnection(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Token'i socket handshake headers içinden alır
    const token = socket.handshake.headers.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        socket.emit('unauthorized');
      } else {
        socket.senderId = decoded.user.id;

        socket.on('chat message', (msg) => {
          console.log('message: ' + JSON.stringify(msg));
          // Mesajı veritabanına kaydetme veya diğer işlemler burada yapılır
          io.emit('chat message', { userId: socket.senderId, message: msg });
          messageService.sendMessage(socket.senderId,msg)
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      }
    });
  });
}



