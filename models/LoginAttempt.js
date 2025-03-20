const mongoose = require('mongoose');

const loginAttemptSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ip_address: { type: String, required: true },
    attempt_count: { type: Number, default: 0 },
    last_attempt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('LoginAttempt', loginAttemptSchema);
