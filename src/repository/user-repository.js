const crudRepository = require("./crud-repository");
const User = require("../models/user");

class UserRepository extends crudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserRepository();