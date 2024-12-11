const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const UPLOADS_DIR = path.join(__dirname, '../../assets/documents/uploads');
const THUMBNAIL_DIR = path.join(__dirname, '../../assets/documents/thumbnails');


if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname.replace(/\s+/g, '-');
        const uniqueName = `${Date.now()}-${uuidv4()}-${originalName}`;
        cb(null, uniqueName);
    }
});

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = [
//         'image/jpeg',
//         'image/png',
//         'video/mp4',
//         'application/pdf',
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     ];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         const error = new Error('Unsupported file type');
//         error.code = 'UNSUPPORTED_FILE_TYPE';
//         cb(error);
//     }
// };


const fileFilter = (req, file, cb) => {
  cb(null, true);
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10000 * 1024 * 1024 } 
});

const saveFileLocally = async (file) => {
  try {
      const uniqueName = uuidv4();
      const originalFilePath = path.join(UPLOADS_DIR, file.filename);
      const uniqueThumbnailName = `${uniqueName}_thumbnail${path.extname(file.originalname)}`;
      const thumbnailFilePath = path.join(THUMBNAIL_DIR, uniqueThumbnailName);

      if (file.mimetype.startsWith('image/')) {
          await sharp(originalFilePath)
              .jpeg({ quality: 50 })
              .rotate()
              .resize({ width: 400, height: 400 })
              .toFile(thumbnailFilePath);
      }

      const relativeFilePath = file.filename;
      const relativeThumbnailPath = file.mimetype.startsWith('image/')
          ? uniqueThumbnailName
          : null;

      return {
          originalFile: relativeFilePath.replace(/\\/g, '/'),
          thumbnailFile: relativeThumbnailPath ? relativeThumbnailPath.replace(/\\/g, '/') : null,
          size: file.size,
          mimetype: file.mimetype,
          originalName: file.originalname
      };
  } catch (err) {
      console.error('Error saving file locally:', err.message);
      throw err;
  }
};


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

module.exports = {
    upload,
    saveFileLocally
};
