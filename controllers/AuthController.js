const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');
const LoginAttempt = require('../models/LoginAttempt');
const redis = require('redis');
// const client = redis.createClient();
// const client = redis.createClient({ url: 'redis://localhost:6379' })
// تسجيل مستخدم جديد
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // التحقق من وجود المستخدم
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // تشفير كلمة المرور
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // إنشاء مستخدم جديد
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// تسجيل الدخول
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Invalid email or password' });


        attempt = await LoginAttempt.findOne({ user_id: user._id });

        // if (!client.isOpen) {
        //     await client.connect();
        // }

        // const cachedAttempt = await client.get(`login_attempts:${user._id}`);

        // let attempt;
        // if (cachedAttempt) {
        //     console.log(cachedAttempt)
        //     // إذا كانت المحاولة موجودة في Redis، استخدمها مباشرة
        //     attempt = JSON.parse(cachedAttempt); 
        //     // يجب أن تكون قد خزنت البيانات بصيغة JSON
        // } else {
        //     // إذا لم تكن موجودة في Redis، جلب المحاولة من قاعدة البيانات
        //     attempt = await LoginAttempt.findOne({ user_id: user._id });
        // }
      
        // إذا كانت المحاولة موجودة
        if (attempt) {
              // لتخزين عدد المحاولات
            //  client.set(`login_attempts:${user._id}`, attempts, 'EX', 600);  // 'EX' تعني أن القيمة ستنتهي بعد 10 دقائق (600 ثانية)
            
      
           if (attempt.attempt_count >= 5) {
                return res.status(403).json({ message: 'Account is locked permanently. Please contact the admin.' });
            }

            // إذا كانت المحاولات الفاشلة 4، تحقق من مضي 10 دقائق
            if (attempt.attempt_count === 4 && attempt.last_attempt) {
                const lockDuration = 10 * 60 * 1000; // 10 دقائق
                const timeSinceLastAttempt = Date.now() - attempt.last_attempt.getTime();
                if (timeSinceLastAttempt < lockDuration) {
                    const minutesLeft = Math.ceil((lockDuration - timeSinceLastAttempt) / 60000);
                    return res.status(403).json({ 
                        message: `Account temporarily locked. Try again after ${minutesLeft} minute(s).` 
                    });
                }
            }
        }

        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // إذا كانت المحاولة غير موجودة، أنشئ واحدة
            if (!attempt) {
                attempt = new LoginAttempt({
                    user_id: user._id,
                    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    attempt_count: 1, // أول محاولة فاشلة
                    last_attempt: new Date()
                });
            } else {
                // تحديث المحاولة الموجودة
                attempt.attempt_count += 1;
                attempt.last_attempt = new Date();
                attempt.ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            }

            await attempt.save();
            // client.set(`login_attempts:${user._id}`, attempts, 'EX', 600);

            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // عند نجاح تسجيل الدخول، إعادة تعيين المحاولات
        if (attempt) {
            await LoginAttempt.deleteOne({ user_id: user._id });
            //فيش داعي يضلن خلص
            // client.del(`login_attempts:${user._id}`);
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        

        res.json({ 
            message: 'Login successful',
            token 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




 // exports.logout = async (req, res) => {
      //     try {
      //         const token = req.header('Authorization');
      //         if (!token) return res.status(400).json({ message: 'No token provided' });
      
      //         // استخراج تاريخ انتهاء التوكن
      //         const decoded = jwt.decode(token);
      //         const expiresAt = new Date(decoded.exp * 1000); 
      
      //         // إضافة التوكن للقائمة السوداء
      //         await Blacklist.create({ token, expiresAt });
      
      //         res.json({ message: 'Logged out successfully' });
      //     } catch (error) {
      //         res.status(500).json({ message: 'Server error' });
      //     }
// };


