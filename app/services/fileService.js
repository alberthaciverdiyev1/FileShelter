const { log, Console } = require('console');
const Files = require('../models/File');
const fs = require('fs/promises');
const path = require('path');

exports.uploadSingleFile = async (req, res) => {
  console.log({ response: response });
  const newFile = new File({
    filename,
    path,
    size,
    mimeType: mimetype,
    uploadedBy: req.user._id
  });

  newFile.save()

  return {
    status: 201,
    message: 'File uploaded successfully.',
  };
};

exports.uploadMultipleFiles = async (uploadResults, req, res) => {
  try {
    for (const file of uploadResults) {
      const newFile = new Files({
        filename: file.originalName,
        originalPath: file.originalFile,
        thumbnailPath: file.thumbnailFile,
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: req.auth.user.id,
      });
      await newFile.save();
    }
    return {
      status: 201,
      message: 'Files uploaded successfully.',
    };
  } catch (error) {
    if (!res.headersSent) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
};


exports.listFiles = async (req, res) => {
  try {
    const files = await Files.find({ deletedAt: null })
      .select('originalPath thumbnailPath filename size mimeType uploadedAt likes isPublic')
      .sort({ uploadedAt: -1 });

    if (!files) {
      return {
        status: 404,
        message: 'No files found',
      };
    }
    return {
      status: 200,
      message: 'Files retrieved successfully',
      data: files
    };

  } catch (error) {
    console.error('Error in fileService.listFiles:', error.message);
    if (!res.headersSent) {
      return {
        status: 500,
        message: error.message
      };
    }
  }
};


