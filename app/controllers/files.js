const fileService = require('../services/fileService');

exports.uploadSingleFile = (req, res) => {
    fileService.uploadSingleFile(req, res);
};

exports.uploadMultipleFiles = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    fileService.uploadMultipleFiles(req, res);
};
exports.listFiles = (req, res) => {
    fileService.listFiles(req, res);
};