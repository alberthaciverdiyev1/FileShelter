const messageService = require('../services/messageService');
exports.chatView = (req, res) => {
    res.render('chat/chat')
};

exports.getMessages = (req, res) => {
    messageService.getMessages()
        .then(messages => res.json(messages))

};
exports.sendMessage = (req, res) => {
    console.log('New client connected');

    socket.on('chat message', async (msg) => {
        io.emit('chat message', msg);
        messageService.sendMessage(req, res)
            .then(message => res.json(message))
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

};