const like = require("../models/like");
const CrudRepository = require("./crud-repository");

class LikeRepository extends CrudRepository {
    constructor() {
        super(like);
    }
}

module.exports = new LikeRepository();