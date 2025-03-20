const mongoose = require('mongoose');

require('dotenv').config({ path: '../.env' });

const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // تحديث جميع المستخدمين لإزالة الحقول
        await User.updateMany({}, { $unset: { failedAttempts: "", lastFailedAttempt: "" } });
        console.log('Fields "failedAttempts" and "lastFailedAttempt" removed successfully.');

        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
