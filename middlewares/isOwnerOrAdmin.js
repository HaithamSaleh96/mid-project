// middlewares/isOwnerOrAdmin.js
const Post = require('../models/Post');

const isOwnerOrAdmin = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // تحقق من أن المستخدم هو صاحب البوست أو أدمين
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isOwnerOrAdmin;
