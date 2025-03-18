const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Blacklist = require('../models/Blacklist');

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

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            message: 'Login successful',
            token 
        });

    } catch (error) {
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


