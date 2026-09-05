const TweetService = require('../services/tweet-service');
const upload = require("../config/file-upload-s3-config")
const tweetService = new TweetService();

const singleUploader = upload.single('image');
const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function(err, data){
            if(err){
                return res.status(500).json({error:err})
            }
            console.log(data)
            const payload = {...req.body};
            payload.image=req.file.location;
             const tweet = await tweetService.create(payload);
        res.status(201).json({
            
            success: true,
            message: 'Tweet created successfully',
            data: tweet
        });
        })
       
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: 'Failed to create tweet',
            error: error.message
        });
    }
};

module.exports = { createTweet };