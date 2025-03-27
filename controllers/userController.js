const Post = require('../models/Post');
const postRepository = require('../repositories/PostRepository');

// إنشاء بوست جديد
// exports.createPost = async (req, res) => {
//     try {
//         const { title, content } = req.body;
        
//         const author = req.user.id;

//         const post = new Post({ title, content, author });
//         await post.save();

//         res.status(201).json({ message: 'Post created successfully', post });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };







// إنشاء بوست جديد بالريبوزتري
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.id;

        const post = await postRepository.createPost({ title, content, author });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
};






// عرض جميع البوستات
// exports.getAllPosts = async (req, res) => {
//     try {
//         const posts = await Post.find().populate('author', 'name');
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };









// عرض جميع البوستات بالريبوزتري
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postRepository.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
};





// // عرض بوست واحد
// exports.getPostById = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id).populate('author', 'name');
//         if (!post) return res.status(404).json({ message: 'Post not found' });
//         res.json(post);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };




// // عرض بوست واحد بالريبوزتري
exports.getPostById = async (req, res) => {
    try {
        const post = await postRepository.getPostById(req.params.id);
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
};





//بوستاته الخاصه
// exports.getMyPosts = async (req, res) => {
//     try {
//         const posts = await Post.find({ author: req.user.id }).populate('author', 'name');
//         res.json(posts);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };





//بوستاته الخاصه بالريبوزتري
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await postRepository.getPostsByUserId(req.user.id);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
};





// تحديث بوست
// exports.updatePost = async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const post = await Post.findById(req.params.id);

//         post.title = title || post.title;
//         post.content = content || post.content;
//         post.updatedAt = Date.now();

//         await post.save();
//         res.json({ message: 'Post updated successfully', post });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };




// تحديث بوست بالريبوزترؤي
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await postRepository.updatePost(req.params.id, { title, content, updatedAt: Date.now() });
        res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
};







// حذف بوست
// exports.deletePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         await post.deleteOne();
//         res.json({ message: 'Post deleted successfully' });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Server error' });
//     }
// };




// حذف بوست
exports.deletePost = async (req, res) => {
    try {
        const post = await postRepository.deletePost(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
};