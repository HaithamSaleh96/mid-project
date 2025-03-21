const Post = require('../models/Post');
const CustomError = require('../utils/CustomError');

class PostRepository {
    // إنشاء بوست جديد
    async createPost(data) {
        try {
            const post = new Post(data);
            return await post.save();
        } catch (error) {
            throw new CustomError(error.message || 'Error creating post', 500);
        }
    }

    // جلب جميع البوستات
    async getAllPosts() {
        try {
            return await Post.find().populate('author', 'name email');
        } catch (error) {
            throw new CustomError(error.message || 'Error fetching posts', 500);
        }
    }

    // جلب بوست بواسطة ID
    async getPostById(id) {
        try {
            const post = await Post.findById(id).populate('author', 'name email');
            if (!post) throw new CustomError('Post not found', 404);
            return post;
        } catch (error) {
            throw new CustomError(error.message || 'Error fetching post by ID', error.statusCode || 500);
        }
    }

    // تحديث بوست
    async updatePost(id, data) {
        try {
            const post = await Post.findByIdAndUpdate(id, data, { new: true });
            if (!post) throw new CustomError('Post not found', 404);
            return post;
        } catch (error) {
            throw new CustomError(error.message || 'Error updating post', error.statusCode || 500);
        }
    }

    // حذف بوست
    async deletePost(id) {
        try {
            const post = await Post.findByIdAndDelete(id);
            if (!post) throw new CustomError('Post not found', 404);
            return post;
        } catch (error) {
            throw new CustomError(error.message || 'Error deleting post', error.statusCode || 500);
        }
    }
}

module.exports = new PostRepository();
