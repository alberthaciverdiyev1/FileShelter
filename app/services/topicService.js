const Topic = require("../models/Topic");
const moment = require('moment');

exports.getAll = async (req, res, next) => {
    try {
        const topics = await Topic.find({
            deletedAt: null
        }).select('topic createdAt')
          .sort({ createdAt: 1 })
          .populate({
                path: 'userId',
                select: 'username -_id'
            });

        const formattedTopics = topics.map(topic => ({
            topic: topic.topic,
            createdAt: moment(topic.createdAt).format('DD MMM YYYY, HH:mm:ss'),
            user: topic.userId
        }));
        res.status(200).json(formattedTopics);
    } catch (err) {
        next(err);
    }
};
exports.addTopic = async (data, res) => {
    console.log({ data });
    try {
        const newTopic = new Topic({
            topic: data.topic,
            userId: data.userId,
        });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        next(err);
    }
};