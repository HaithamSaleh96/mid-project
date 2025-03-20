const Post = require('../models/Post');

// إنشاء بوست جديد
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        const author = req.user.id;

        const post = new Post({ title, content, author });
        await post.save();

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// عرض جميع البوستات
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




// // عرض بوست واحد
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



//بوستاته الخاصه
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id }).populate('author', 'name');
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// تحديث بوست
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);

        post.title = title || post.title;
        post.content = content || post.content;
        post.updatedAt = Date.now();

        await post.save();
        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// حذف بوست
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};
