const userRepository = require('../repository/user-repository');


class UserService {
    constructor() {
        this.userRepository = userRepository;
    }

    async signUp(userData) {
        try {
            const existingUser = await this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const newUser = await this.userRepository.create(userData);
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();