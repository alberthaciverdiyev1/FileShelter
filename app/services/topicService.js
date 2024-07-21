const Topic = require("../models/Topic");

exports.getAll= async (req, res, next) => {
    try {
        const topics = await Topic.find({
            $and: [
                { deletedAt: null }
            ]
        }).sort({ createdAt: 1 });
        // const topics = await Topic.find();

        console.log({topics});
        res.json(topics);
    } catch (err) {
        next(err);
    }
};
exports.addTopic= async (data, res) => {
    console.log({data});
    try {
        const newTopic = new Topic({
            topic: data.topic,
            userId:  data.userId,
        });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        next(err);
    }
};