const messageService = require('../services/messageService');

exports.chatView = (req,res) => { 
    res.render('chat/chat')
};

exports.getMessages = (req,res) => {
    messageService.getMessages()
   .then(messages => res.json(messages))
    
};
exports.sendMessage = (req,res) => {
    messageService.sendMessage(req,res)
   .then(message => res.json(message))
};