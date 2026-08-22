const like = require("../models/like");
const CrudRepository = require("./crud-repository");

class LikeRepository extends CrudRepository {
    constructor() {
        super(like);
    }

    async findByUserIdAndLikeable(data) {
        try {
            const likeData = await like.findOne(data);
            return likeData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LikeRepository();