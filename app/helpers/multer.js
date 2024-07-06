const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.uploadSingle = (req, res, next) => {
  return upload.single('avatar')(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Multer error' });
    } else if (err) {
      return res.status(500).json({ error: 'Undefined Error' });
    }
    next();
  });
};

exports.uploadMultiple = (req, res, next) => {
  return upload.array('photos', 50)(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'Multer Error' });
    } else if (err) {
      return res.status(500).json({ error: 'Undefined Error' });
    }
    next();
  });
};

