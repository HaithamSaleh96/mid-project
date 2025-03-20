const SendEmail = require('../events/SendEmail');
const axios = require('axios');
const FormData = require('form-data');

SendEmail.on('SendEmail', async (userEmail, subject) => {
    try {

        console.log("Send Email")
    } catch (error) {
        console.error('❌ خطأ أثناء إرسال الرسالة:', error.response ? error.response.data : error.message);
    }
});
