const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();
const sharp = require('sharp');
const { log } = require('console');

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'video/mp4',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Unsupported file type');
    error.code = 'UNSUPPORTED_FILE_TYPE';
    cb(error);
  }
};

upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

upload.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    console.log('Headers already sent in upload.errorHandler');
    return next(err);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({ message: 'Too many files uploaded' });
  } else if (err.code === 'UNSUPPORTED_FILE_TYPE') {
    return res.status(400).json({ message: 'Unsupported file type' });
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File size too large' });
  } else {
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};


// Function to upload file to Nextcloud
uploadToNextcloud = async (file) => {
  const uploadedFiles = [];
  const uniqueName = uuidv4();
  const uniqueFileName = uniqueName + path.extname(file.originalname);
  const uniqueThumbnailName = uniqueName + '_thumbnail' + path.extname(file.originalname);

  const response = await fetch(`${process.env.NEXTCLOUD_FILES_URL}/${uniqueFileName}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXTCLOUD_USERNAME}:${process.env.NEXTCLOUD_PASSWORD}`).toString('base64'),
      'Content-Type': file.mimetype
    },
    body: file.buffer
  });

  if (response.ok) {
    const buffer = await sharp(file.buffer)
      .jpeg({ quality: 50 })
      .rotate()
      .resize({ width: 400, height: 400 })
      .toBuffer();

    const response = await fetch(`${process.env.NEXTCLOUD_THUMBNAILS_URL}/${uniqueThumbnailName}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXTCLOUD_USERNAME}:${process.env.NEXTCLOUD_PASSWORD}`).toString('base64'),
        'Content-Type': file.mimetype
      },
      body: buffer
    });

    if (!response.ok) {
      throw new Error(`Nextcloud upload failed: ${response.statusText}`);
    }
    uploadedFiles.push(
      file.size,
      file.mimetype,
      file.originalname,
      uniqueFileName,
      uniqueThumbnailName
    )

  } else {
    throw new Error(`Failed to upload file to Nextcloud: ${response.statusText}`);
  }

  return uploadedFiles;
};

module.exports = {
  upload,
  uploadToNextcloud,
};
