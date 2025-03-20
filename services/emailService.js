require('dotenv').config();
const axios = require('axios');

async function sendEmail(to, subject, text) {
    try {
        const response = await axios.post(
            `${process.env.INFOBIP_BASE_URL}/email/3/send`,
            {
                from: process.env.INFOBIP_SENDER_EMAIL,
                to: [to],
                subject: subject,
                text: text
            },
            {
                headers: {
                    Authorization: `App ${process.env.INFOBIP_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Email sent successfully:', response.data);
    } catch (error) {
        console.error('❌ Error sending email:', error.response ? error.response.data : error.message);
    }
}

module.exports = { sendEmail };
