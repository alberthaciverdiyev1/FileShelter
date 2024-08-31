const Dictionary = require('../models/Dictionary');

exports.getAll = async (req, res, next) => {
    try {
        const dictionary = await Dictionary.find({
            deletedAt: null
        }).select('foreignWord translatedWord description')
          .sort({ createdAt: -1 });

        //   .populate({
        //         path: 'userId',
        //         select: 'username -_id'
        //     });

        // const formattedTopics = topics.map(topic => ({
        //     topic: topic.topic,
        //     createdAt: moment(topic.createdAt).format('DD MMM YYYY, HH:mm:ss'),
        //     user: topic.userId
        // }));
        // res.status(200).json(formattedTopics);
        console.log({dictionary});
        
        res.status(200).json(dictionary);
    } catch (err) {
        next(err);
    }
};
exports.addWord = async (data, res) => {
    console.log({ data });
    try {
        const newWord = new Dictionary({
            foreignWord: data.foreignWord,
            translatedWord: data.translatedWord,
            description: data.description,
            userId: data.userId,
        });
        await newWord.save();
        res.status(201).json(newWord);
    } catch (err) {
        next(err);
    }
};