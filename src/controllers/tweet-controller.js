const TweetService = require('../services/tweet-service');

const tweetService = new TweetService();

const createTweet = async (req, res) => {
    try {
        const tweet = await tweetService.create(req.body);
        res.status(201).json({
            
            success: true,
            message: 'Tweet created successfully',
            data: tweet
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: 'Failed to create tweet',
            error: error.message
        });
    }
};

module.exports = { createTweet };