const User = require('../models/User');
const Post = require('../models/Post');
const LoginAttempt = require('../models/LoginAttempt');
const SendEmail = require('../events/SendEmail');
const adminRepository = require('../repositories/AdminRepository');




// عرض جميع المستخدمين
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}




// إضافة مستخدم جديد
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;


        const validRoles = ['user', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Role must be either "user" or "admin".' });
        }

        // تحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
 
        const isActive=true;

        const user = new User({ name, email, password, role, isActive});
        await user.save();
        SendEmail.emit('SendEmail', user.email, "wellcome to ....");

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};




// // تعديل بيانات مستخدم
exports.updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const validRoles = ['user', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Role must be either "user" or "admin".' });
        }
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        SendEmail.emit('SendEmail', user.email, "your account is update by Admin review account");
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};








// // حذف مستخدم
// exports.deleteUser = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         SendEmail.emit('SendEmail', user.email, "Your account has been deleted by the admin.");

//         await Post.deleteMany({ author: req.params.id });

//         // حذف المستخدم نفسه
//         await user.remove();

//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };



// // حذف مستخدم بالريبوزتري
exports.deleteUser = async (req, res) => {
    try {
        // حذف المستخدم عن طريق الريبوستري
        const user = await adminRepository.deleteUser(req.params.id);

        // إرسال بريد إلكتروني لإعلام المستخدم بالحذف
        SendEmail.emit('SendEmail', user.email, "Your account has been deleted by the admin.");

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message });
    }
};





// فك حظر اليوزر
exports.unblockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // تحديث عدد المحاولات في جدول LoginAttempt
        await LoginAttempt.findOneAndUpdate(
            { user_id: user._id },
            { attempt_count: 0, last_attempt: Date.now() }
        );

        // تفعيل الحساب إذا كان معطلاً
        user.isActive = true;
        await user.save();
        SendEmail.emit('SendEmail', user.email, "your account is active by Admin can be login");

        res.json({ message: 'User unblocked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};



//DTO or format
const formatPost = (post) => {
    return {
        id: post._id,
        title: post.title,
        content: post.content,
        author: {
            id: post.author._id,
            name: post.author.name,
            email: post.author.email,
        },
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
    };
};



// إحضار جميع البوستات
exports.AdmingetAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        const formattedPosts = posts.map(formatPost);
        res.json({ message: 'Posts retrieved successfully', posts: formattedPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// جلب بوست واحد
exports.AdmingetPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.json({ message: 'Post retrieved successfully', post: formatPost(post) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};





// تحديث بوست (بما أن الادمن مسموح له)
exports.AdminupdatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.title = title || post.title;
        post.content = content || post.content;
        post.updatedAt = Date.now();

        await post.save();

        const user = await User.findById(post.author);

        SendEmail.emit('SendEmail', user.email, "your post is update by admin review");

        res.json({ message: 'Post updated successfully', post: formatPost(post) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// حذف بوست
exports.AdmindeletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const user = await User.findById(post.author);

        SendEmail.emit('SendEmail', user.email, "your post is delete by admin review");

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};