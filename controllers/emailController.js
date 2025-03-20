const { sendEmail } = require('../services/emailService');

async function sendTestEmail(req, res) {
    const { to, subject, text } = req.body;
    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
}

module.exports = { sendTestEmail };