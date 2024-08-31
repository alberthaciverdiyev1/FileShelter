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
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    
    const { foreignWord, translatedWord, description } = req.body.data;
    
    const trimmedForeignWord = foreignWord ? foreignWord.trim() : '';
    const trimmedTranslatedWord = translatedWord ? translatedWord.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    
    const capitalizedForeignWord = capitalizeFirstLetter(trimmedForeignWord);
    const capitalizedTranslatedWord = capitalizeFirstLetter(trimmedTranslatedWord);
    const capitalizedDescription = capitalizeFirstLetter(trimmedDescription);
    
    if (!capitalizedForeignWord || !capitalizedTranslatedWord) {
        return res.status(400).json({ error: 'Foreign Word or Translated Word is required.' });
    }
    
    const data = {
        foreignWord: capitalizedForeignWord,
        translatedWord: capitalizedTranslatedWord,
        description: capitalizedDescription,
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