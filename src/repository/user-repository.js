const crudRepository = require("./crud-repository");
const User = require("../models/user");

class UserRepository extends crudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        try {
            const res = await User.findOne({ email: email });
            
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserRepository();