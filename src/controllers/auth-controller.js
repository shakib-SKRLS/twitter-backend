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

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if(!user.comparePassword(password)){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json({ message: 'Login successful', token: user.genJWT() });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    signUp,
    login
};