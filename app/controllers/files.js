const fileService = require('../services/fileService');
const sharp = require('../helpers/sharp');
const { uploadToNextcloud } = require('../helpers/multer');



exports.uploadSingleFile = (req, res) => {
    fileService.uploadSingleFile(req, res);
};

exports.uploadMultipleFiles = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    try {
        const uploadedFiles = req.files.map(file => file.path);
        const uploadPromises = req.files.map(file => uploadToNextcloud(file));
        req.filearray = await Promise.all(uploadPromises);
        await fileService.uploadMultipleFiles(req, res);

    } catch (err) {
        console.error('An error occurred during file upload:', err);
        return res.status(500).json({ message: 'An error occurred during file upload' });
    }
};
exports.listFiles = (req, res) => {
    fileService.listFiles(req, res);
};