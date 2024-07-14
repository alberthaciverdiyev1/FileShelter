const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();

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

const upload = multer({
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

// Nextcloud configuration
const NEXTCLOUD_URL = 'https://nextcloud.example.com/remote.php/webdav';
const NEXTCLOUD_USERNAME = 'your-username';
const NEXTCLOUD_PASSWORD = 'your-password';

// Function to upload file to Nextcloud
const uploadToNextcloud = async (file) => {
  const uniqueFileName = uuidv4() + path.extname(file.originalname);

  const response = await fetch(`${NEXTCLOUD_URL}/${uniqueFileName}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${NEXTCLOUD_USERNAME}:${NEXTCLOUD_PASSWORD}`).toString('base64'),
      'Content-Type': file.mimetype
    },
    body: file.buffer
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file to Nextcloud: ${response.statusText}`);
  }

  return response;
};

module.exports = {
  upload,
  uploadToNextcloud,
};
