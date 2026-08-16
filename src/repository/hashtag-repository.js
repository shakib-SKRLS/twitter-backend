const Hashtag = require('../models/hashtags')



class HashtagRepository {
    async create(data) {
        try {
            const hashtag = await Hashtag.create(data);
            return hashtag;
        } catch (error) {
            throw error;
        }
    }

    async getAll(offset, limit) {
        try {
            const hashtags = await Hashtag.find().skip(offset).limit(limit);
            return hashtags;
        } catch (error) {
            throw error;
        }
    }
    async get(id) {
        try {
            const hashtag = await Hashtag.findById(id);
            return hashtag;
        } catch (error) {
            throw error;
        }
    }

   
    
    async delete(id) {
        try {
            const hashtagData = await Hashtag.findByIdAndDelete(id);
            return hashtagData;
        } catch (error) {
            throw error;
        }
    }

    async bulkCreate(data) {
        try {
            const hashtags = await Hashtag.insertMany(data, { ordered: false });
            return hashtags;
        } catch (error) {
            throw error;
        }
    }
    async findByName(titleList) {
        try {
            const hashtags = await Hashtag.find({ title: { $in: titleList } });
            return hashtags;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new HashtagRepository();