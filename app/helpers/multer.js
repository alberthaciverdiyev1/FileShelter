const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.replace(/\s+/g, '-');
    const uniqueName = `${Date.now()}-${uuidv4()}-${originalName}`;
    cb(null, uniqueName);
  }
});

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

module.exports = upload;
