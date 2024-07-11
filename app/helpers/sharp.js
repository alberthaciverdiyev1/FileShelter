
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;


exports.createThumbnail = async (uploadedFilePath) => {
    try {
        const thumbnailFolder = path.join(path.dirname(uploadedFilePath), 'thumbnails');
        await fs.mkdir(thumbnailFolder, { recursive: true });

        await sharp(uploadedFilePath)
            .jpeg({quality: 50})
            .rotate()
            // .toBuffer().then(async buffer =>{
            //     await fs.writeFile(('thumbnails' + uploadedFilePath), buffer)
            // })
            .resize({ width: 400 ,height:400})
            .toFile(path.resolve(path.dirname(uploadedFilePath), 'thumbnails', `${path.basename(uploadedFilePath)}`));
        
        return true;
    } catch (err) {
        console.error('An unexpected error occurred:', err);
        return false;
    }
};
