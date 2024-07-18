const Message = require('../models/Message');

exports.getMessages = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId, deletedAt: null },
                { senderId: receiverId, receiverId: senderId, deletedAt: null }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        next(err);
    }
};

exports.sendMessage = async (senderId,msg,next) => {
    try {
        const { receiverId, message } = msg
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        });
        console.log({newMessage});
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        next(err);
    }
};
