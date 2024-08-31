const dictionaryService = require('../services/dictionaryService');

exports.index = (req, res) => {
    res.render('dictionary/index')
};

exports.list = (req, res) => {
    dictionaryService.getAll(req, res);
};

exports.addWord = (req, res) => {

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        string = string.trim();
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    let { foreignWord, translatedWord, description } = req.body.data;
    if (!foreignWord || !translatedWord) {
        return res.status(400).json({ error: 'Foreign Word or Translated Word is required.' });
    }

    foreignWord = capitalizeFirstLetter(foreignWord);
    translatedWord = capitalizeFirstLetter(translatedWord);
    description = description ? capitalizeFirstLetter(description) : '';

    const data = {
        foreignWord,
        translatedWord,
        description,
        userId: req.auth.user.id
    };

    dictionaryService.addWord(data, res);

};
exports.update = (req, res) => {
    dictionaryService.getAllUsers(req, res);
};
exports.delete = (req, res) => {
    dictionaryService.getAllUsers(req, res);
};