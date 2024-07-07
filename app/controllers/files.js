const fileService = require('../services/fileService');

exports.uploadSingleFile = (req, res) => {
    const response = fileService.uploadSingleFile(req, res);
    res.json({ staus:response.status, message: response.message });
};

exports.uploadMultipleFiles = (req, res) => {
    // console.log({req});
    const response = fileService.uploadMultipleFiles(req, res);
    res.json({ staus:response.status, message: response.message });
};
