const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true, default: false },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user'
    },

});



module.exports = mongoose.model('User', userSchema);
