const mongoose = require('mongoose');

require('dotenv').config({ path: '../.env' });

const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI
    , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('🚀 متصل بقاعدة البيانات');

        // إضافة الحقل الجديد مع قيمة افتراضية
        await User.updateMany({}, { $set: { newField: 'defaultValue' } });
        console.log('✅ تم تحديث جميع السجلات');

        // إغلاق الاتصال
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
    });
