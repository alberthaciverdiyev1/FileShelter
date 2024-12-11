const fileService = require('../services/fileService');
const { upload, saveFileLocally } = require('../helpers/multer');
const fs = require('fs');
const path = require('path');

exports.uploadSingleFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.file;

        const saveResult = await saveFileLocally(file);
        
        await fileService.uploadSingleFile(req, res);

        res.status(200).json({
            message: 'File uploaded successfully',
            result: saveResult
        });
    } catch (err) {
        console.error('Error during single file upload:', err.message);
        res.status(500).json({ message: 'An error occurred during single file upload' });
    }
};

exports.uploadMultipleFiles = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    try {
        const uploadPromises = req.files.map(async (file) => {
            const saveResult = await saveFileLocally(file);
            return saveResult;
        });

        const uploadResults = await Promise.all(uploadPromises);

        // await fileService.uploadMultipleFiles(req, res);

        res.status(200).json({
            message: 'Files uploaded successfully',
            results: uploadResults
        });
    } catch (err) {
        console.error('An error occurred during file upload:', err.message);
        res.status(500).json({ message: 'An error occurred during file upload' });
    }
};

exports.listFiles = async (req, res) => {
    try {
        const files = await fileService.listFiles(req, res);
        res.status(200).json({ files });
    } catch (err) {
        console.error('Error listing files:', err.message);
        res.status(500).json({ message: 'An error occurred while listing files' });
    }
};
