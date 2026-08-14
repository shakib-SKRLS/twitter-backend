const tweet = require("../models/tweet");

class tweetRepository {
    async create(data) {
        try {
            const tweetData = await tweet.create(data);
            return tweetData;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const tweets = await tweet.find();
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
    async update(id, data) {
        try {
            const tweetData = await tweet.findByIdAndUpdate(id, data, { new: true });
            return tweetData;
        } catch (error) {
            throw error;
        }   
    }
    async delete(id) {
        try {
            const tweetData = await tweet.findByIdAndDelete(id);
            return tweetData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new tweetRepository();