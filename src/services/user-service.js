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
    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findByEmail(email);
           
            return user;
        } catch (error) {
            throw error;
        }
    }
    async signIn(userData) {
        try {
        const user = await this.getUserByEmail(userData.email);
        console.log(userData);
        if (!user) {
            throw new Error('User not found');
        }
        if(!user.comparePassword(userData.password)) {
            throw new Error('Invalid password');
        }
        const token = user.genJWT();
        // Here you would typically verify the password
        return { user, token };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();