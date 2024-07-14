const userService = require('../services/userService');


exports.getAllUsers = (req, res) => {
    userService.getAllUsers(req, res);
};