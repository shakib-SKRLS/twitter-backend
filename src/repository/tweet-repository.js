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