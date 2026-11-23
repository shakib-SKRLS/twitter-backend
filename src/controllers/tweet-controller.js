const TweetService = require('../services/tweet-service');
const upload = require("../config/file-upload-s3-config")
const tweetService = new TweetService();

const singleUploader = upload.single('image');
const createTweet = async (req, res) => {
    singleUploader(req, res, async function(err){
        if(err){
            return res.status(500).json({error: err.message || err})
        }
        try {
            const payload = {...req.body};
            if (req.file) {
                payload.image = req.file.location;
            }
            const tweet = await tweetService.create(payload);
            return res.status(201).json({
                success: true,
                message: 'Tweet created successfully',
                data: tweet
            });
        } catch (error) {
            return res.status(400).json({ 
                success: false,
                message: 'Failed to create tweet',
                error: error.message
            });
        }
    });
};

module.exports = { createTweet };
