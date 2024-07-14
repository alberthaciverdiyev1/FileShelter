const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
    try {
        // const users = await User.find({
        //     $and: [
        //         { deletedAt: null }
        //     ]
        // }).sort({ createdAt: 1 });
        const users = await User.find();

        console.log({users});
        res.json(users);
    } catch (err) {
        next(err);
    }
};