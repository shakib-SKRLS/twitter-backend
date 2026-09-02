const userService = require('../services/user-service');


const signUp = async (req, res) => {
    const {name, email, password } = req.body;
    try {
        const newUser = await userService.signUp({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    signUp
};