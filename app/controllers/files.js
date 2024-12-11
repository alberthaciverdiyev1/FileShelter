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

        let response = await fileService.uploadSingleFile(req, res);

        res.status(response.status).json({
            message: response.message,
            status: response.status,
            result: saveResult
        });
    } catch (err) {
        res.status(response.status).json({
            message: response.message,
            status: response.status,
            result: saveResult
        });
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

        let response = await fileService.uploadMultipleFiles(uploadResults, req, res);

        console.log({ response })
        res.status(response.status).json({
            message: response.message,
            status: response.status,
            result: uploadResults
        });
    } catch (err) {
        res.status(response.status).json({
            message: response.message,
            status: response.status,
            result: saveResult
        });
    }
};


exports.listFiles = async (req, res) => {
    try {
        let response = await fileService.listFiles(req, res);
        res.status(response.status).json({
            message: response.message,
            status: response.status,
            data: response.data
        });
    } catch (err) {
        if (!res.headersSent) {
            res.status(response.status).json({
                message: response.message,
                status: response.status,
            });
        }
    }
};

