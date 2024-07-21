const topicService = require('../services/topicService');

exports.wheelView = (req, res) => {
    res.render('wheel/index')
};
exports.wheelDetails = (req, res) => {
    res.render('wheel/details')
};

exports.wheelAction = (req, res) => {
    res.render('wheel/index')
};

exports.addTopic = (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required.' });
    }
    const data = {
        topic,
        userId: req.auth.user.id
    };
    topicService.addTopic(data, res);
};

exports.getTopics = (req, res) => {
    topicService.getAll(req, res);
};