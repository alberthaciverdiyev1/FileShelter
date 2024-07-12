const Message = require('../models/Message');

exports.getMessages = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId, deletedAt: null },
                { sender: receiverId, receiver: senderId, deletedAt: null }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        next(err);
    }
};

exports.sendMessage = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.params;
        const { content } = req.body;

        console.log({req});

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            content,
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        next(err);
    }
};
