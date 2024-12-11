const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const UPLOADS_DIR = path.join(__dirname, '../documents/uploads');
const THUMBNAIL_DIR = path.join(__dirname, '../documents/thumbnails');

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

        return {
            originalFile: originalFilePath,
            thumbnailFile: file.mimetype.startsWith('image/') ? thumbnailFilePath : null,
            size: file.size,
            mimetype: file.mimetype,
            originalName: file.originalname
        };
    } catch (err) {
        console.error('Error saving file locally:', err.message);
        throw err;
    }
};

module.exports = {
    upload,
    saveFileLocally
};
