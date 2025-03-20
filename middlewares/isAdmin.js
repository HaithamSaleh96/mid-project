const Post = require('../models/Post');

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isAdmin;
