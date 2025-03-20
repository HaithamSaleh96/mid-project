// const mongoose = require('mongoose');
// require('dotenv').config();
// const Post = require('./models/Post'); // تأكد من أن المسار صحيح

// // الاتصال بقاعدة البيانات
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
// });

// // بيانات العنصر الجديد
// const newPost = {
//     title: 'عنوان المقال',
//     content: 'محتوى المقال هنا...',
//     author: '67d9c750a84a2bdc404b4c35', // تأكد من أن هذا الـ ObjectId صحيح
// };

// // إنشاء العنصر وإضافته إلى قاعدة البيانات
// Post.create(newPost)
//     .then((post) => {
//         console.log('تم إضافة العنصر بنجاح:', post);
//     })
//     .catch((err) => {
//         console.error('فشل في إضافة العنصر:', err);
//     });




// require('dotenv').config();
// const axios = require('axios');
// const FormData = require('form-data');

// async function sendEmail(to, subject, text) {
//     try {
//         // إنشاء نموذج بيانات
//         const formData = new FormData();
//         formData.append('from', process.env.INFOBIP_SENDER_EMAIL);
//         formData.append('to', to);
//         formData.append('subject', subject);
//         formData.append('text', text);

//         const response = await axios.post(
//             `${process.env.INFOBIP_BASE_URL}/email/3/send`,
//             formData,
//             {
//                 headers: {
//                     Authorization: `App ${process.env.INFOBIP_API_KEY}`,
//                     ...formData.getHeaders(),
//                 }
//             }
//         );

//         console.log('✅ Email sent successfully:', response.data);
//     } catch (error) {
//         if (error.response) {
//             console.error('❌ Error response status:', error.response.status);
//             console.error('❌ Error response data:', JSON.stringify(error.response.data, null, 2));
//         } else {
//             console.error('❌ Error message:', error.message);
//         }
//     }
// }

// // تجربة إرسال الإيميل
// sendEmail('karamomari20112001@gmail.com', 'Hello from Infobip', 'This is a test email.');



// async function checkMessageStatus(bulkId) {
//     try {
//         const response = await axios.get(
//             `${process.env.INFOBIP_BASE_URL}/email/1/reports?bulkId=${bulkId}`,
//             {
//                 headers: {
//                     Authorization: `App ${process.env.INFOBIP_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         console.log('📧 Message Status:', response.data);
//     } catch (error) {
//         if (error.response) {
//             console.error('❌ Error checking message status:', JSON.stringify(error.response.data, null, 2));
//         } else {
//             console.error('❌ Error message:', error.message);
//         }
//     }
// }

// // استدعاء الدالة للتحقق من الحالة
// checkMessageStatus('e3om13mv2je45rlf9vie');




// async function sendEmail(to, subject, htmlContent) {
//     try {
//         const formData = new FormData();
//         formData.append('from', process.env.INFOBIP_SENDER_EMAIL);
//         formData.append('to', to);
//         formData.append('subject', subject);
//         formData.append('html', htmlContent); // هنا استخدم HTML

//         const response = await axios.post(
//             `${process.env.INFOBIP_BASE_URL}/email/3/send`,
//             formData,
//             {
//                 headers: {
//                     ...formData.getHeaders(), // إضافة ترويسة FormData
//                     Authorization: `App ${process.env.INFOBIP_API_KEY}`,
//                 }
//             }
//         );

//         console.log('✅ Email sent successfully:', response.data);
//     } catch (error) {
//         console.error('❌ Error sending email:', error.response ? error.response.data : error.message);
//     }
// }

// // استدعاء الدالة لتجربتها
// sendEmail(
//     'karamomari20112001@gmail.com',
//     'Hello from Infobip',
//     '<h1>Hello from Infobip</h1><p>This is a test email.</p>'
// );
