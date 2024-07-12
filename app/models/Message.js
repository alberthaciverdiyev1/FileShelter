const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    content: { type: String, required: true },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);

