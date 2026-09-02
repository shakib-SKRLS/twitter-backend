const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});


userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);  
    } catch (error) {
        throw error;
    }
};  

userSchema.methods.genJWT = function () {
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });
};

const User = mongoose.model('User', userSchema);
module.exports = User;