const fileService = require('../services/fileService');

exports.uploadSingleFile = (req, res) => {
    const response = fileService.uploadSingleFile(req, res);
    res.json({ staus: response.status, message: response.message });
};

exports.uploadMultipleFiles = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    const response = fileService.uploadMultipleFiles(req, res);
    res.json({ response });
};
exports.listFiles = (req, res) => {
    fileService.listFiles(req, res).then((response) => {
        res.json(response);
    });
};