const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Topic', topicSchema);

