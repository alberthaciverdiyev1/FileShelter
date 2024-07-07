const Document = require('../models/File');

exports.uploadSingleFile = async (req, res) => {
  console.log({ response: response });
  const newFile = new File({
    filename,
    path,
    size,
    mimeType: mimetype,
    uploadedBy: req.user._id,

    filename: {
      type: String,
      required: true
    },

  });

  newFile.save()
    .then(file => res.status(201).json(file))
    .catch(error => res.status(500).json({ error: error.message }));
  res.json({ message: 'File uploaded successfully', file: req.file });
};

exports.uploadMultipleFiles = async (req, res) => {
  try {
    for (const file of req.files) {
      const newFile = new Document({
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
        // uploadedBy: 555,  // Örneğin sabit bir kullanıcı ID'si
      });

      await newFile.save().then(result => {
        res.status(201).json({ status: 201, message: 'Files uploaded successfully' });
      }).catch(error => {
        res.status(500).json({ status: 500, message: 'An error occurred while uploading files' });
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
};
exports.listFiles = async (req, res) => {
  try {
    await Document.find({
      $and: [
        // { $or: [{ type: 'photo' }, { type: 'video' }] },
        { deleted_at: { $exists: false } }
      ]
    }).exec().then(result => {
      console.log({ result });
      res.status(200).json({ status: 200, message: 'Success', data: result });

    }).catch(x => {
      throw x;
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}
