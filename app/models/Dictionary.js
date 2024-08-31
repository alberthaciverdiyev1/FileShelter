const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dictionarySchema = new mongoose.Schema({
    foreignWord: {
        type: String,
        required: true
    },
    translatedWord: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
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

module.exports = mongoose.model('Dictionary', dictionarySchema);

