const tweet = require("../models/tweet");
const CrudRepository = require("./crud-repository");

class TweetRepository extends CrudRepository {
    constructor() {
        super(tweet);
    }

  

    async getAll(offset, limit) {
        try {
            const tweets = await tweet.find().skip(offset).limit(limit);
            return tweets;
        } catch (error) {
            throw error;
        }
    }
    async get(id) {
        try {
            const tweetData = await tweet.findById(id);
            return tweetData;
        } catch (error) {
            throw error;
        }
    }

    async getWithComments(id) {
        try {
            const tweetData = await tweet.findById(id).populate({path: "comments", select: "content userEmail createdAt updatedAt"});
            return tweetData;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = new TweetRepository();