const userService = require('../services/userService');

exports.index = (req, res) => {
    res.render('dictionary/index')
};

exports.list = (req, res) => {
    userService.getAllUsers(req, res);
};

exports.add = (req, res) => {
    userService.getAllUsers(req, res);
};
exports.update = (req, res) => {
    userService.getAllUsers(req, res);
};
exports.delete = (req, res) => {
    userService.getAllUsers(req, res);
};