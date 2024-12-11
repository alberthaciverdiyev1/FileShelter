const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    originalPath: {
        type: String,
        required: true
    },
    thumbnailPath: {
        type: String,
        default: null 
    },
    size: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
