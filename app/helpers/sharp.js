
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;


exports.createThumbnail = async (uploadedFilePath) => {
    console.log({uploadedFilePath: uploadedFilePath})
    try {
        const thumbnailFolder = path.join(path.dirname(uploadedFilePath), 'thumbnails');
        await fs.mkdir(thumbnailFolder, { recursive: true });

        await sharp(uploadedFilePath)
            .resize({ width: 200, height: 200 })
            .toFile(path.resolve(path.dirname(uploadedFilePath), 'thumbnails', `${path.basename(uploadedFilePath, path.extname(uploadedFilePath))}-thumbnail.jpg`));
        
        return true;
    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return false;
    }
};
