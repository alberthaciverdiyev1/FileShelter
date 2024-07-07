
const validator = require('validator');

exports.registerValidator = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    if (!validator.isLength(username, { min: 3, max: 20 })) {
        return res.status(400).json({ error: "Username must be between 3 and 20 characters long" });
    }

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please enter a valid email address" });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    if (!confirmPassword) {
        return res.status(400).json({ error: "Password is required" });
    }

    if (!validator.isLength(confirmPassword, { min: 6 })) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    if (!validator.equals(password, confirmPassword)) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    next();
};

const allowedFileTypes = ['image', 'video', 'application/pdf', 'application/msword', 'application/vnd.ms-excel'];

exports.fileValidator = (req, file, cb) => {
    if (!req.file) {
        const error = new Error('No file were uploaded.');
        error.status = 400;
    }

    const fileType = file.mimetype;
    if (!allowedFileTypes.includes(fileType)) {
        const error = new Error('Only files of type image, video, PDF, Word, or Excel can be uploaded.');
        error.status = 400;
        return cb(error);
    }
    cb(null, true);
};
exports.multipleFileValidator = (req, file, cb) => {
    console.log(req.files);
    if (!req.files) {
        const error = new Error('No file were uploaded.');
        error.status = 400;
    }

    const fileTypes = req.files.map(f => f.mimetype);
    for (const fileType of fileTypes) {
        if (!allowedFileTypes.includes(fileType)) {
            const error = new Error('Only files of type image, video, PDF, Word, or Excel can be uploaded.');
            error.status = 400;
            return cb(error);
        }
    }
    cb(null, true);
};


