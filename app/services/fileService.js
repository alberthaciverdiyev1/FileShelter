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
    .then(file => res.status(201).json(file))
    .catch(error => res.status(500).json({ error: error.message }));
  res.json({ message: 'File uploaded successfully', file: req.file });
};

exports.uploadMultipleFiles = async (req, res) => {
  try {
    for (const file of req.files) {
      let modifiedPath = file.path.replace("assets\\uploads\\", "");
      modifiedPath = modifiedPath.trim();
      const newFile = new Files({
        filename: file.originalname,
        path: modifiedPath,
        size: file.size,
        mimeType: file.mimetype,
        uploadedBy: req.auth.user.id, 
      });
      await newFile.save();
    }
    res.status(201).json({ status: 201, message: 'Files uploaded successfully' });
  } catch (error) {
    console.log({ error });
    if (!res.headersSent) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
};
exports.listFiles = async (req, res) => {
  try {
    const files = await Files.find({
      $and: [
        { deleted_at: { $exists: false } }
      ]
    }).select('path filename likes uploadedAt');
    // return files;
    // console.log({files}); 
    res.json({ status: 200, message: 'Success', data: files });
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}
