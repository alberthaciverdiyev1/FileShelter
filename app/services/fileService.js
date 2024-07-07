const { uploadSingleFile, uploadMultipleFiles } = require('../helpers/multer');

exports.uploadSingleFile = async (req, res) => {
  console.log({ response: response });
  //    const newFile = new File({
  //      filename,
  //      alias: req.body.alias || filename,
  //      path,
  //      size,
  //      mimeType: mimetype,
  //      uploadedBy: req.user._id,
  //    });

  // newFile.save()
  //   .then(file => res.status(201).json(file))
  //   .catch(error => res.status(500).json({ error: error.message }));
  // res.json({ message: 'File uploaded successfully', file: req.file });
};

exports.uploadMultipleFiles = async (req, res) => {
  // console.log(req); return;.]
  // res.json({ message: 'Files uploaded successfully', files: req.files });
  // console.log({response: response});
  // const file = new
};
