// repositories/UserRepository.js
const User = require('../models/User');
const CustomError = require('../errors/CustomError');

class UserRepository {
    async getAllUsers() {
        try {
            return await User.find().select('-password');;
        } catch (error) {
            throw new CustomError('Error retrieving users', 500);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id).select('-password');;
            if (!user) throw new CustomError('User not found', 404);
            return user;
        } catch (error) {
            throw new CustomError(error.message || 'Error retrieving user', error.statusCode || 500);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email }).select('-password');;
            return user || null;
        } catch (error) {
            throw new CustomError(error.message || 'Error fetching user by email', 500);
        }
    }

    async createUser(data) {
        try {
            const user = new User(data);
            return await user.save();
        } catch (error) {
            throw new CustomError(error.message || 'Error creating user', 500);
        }
    }

    async updateUser(id, data) {
        try {
            const user = await this.getUserById(id);
            if (!user) throw new CustomError('User not found', 404);

            user.name = data.name || user.name;
            user.email = data.email || user.email;
            user.role = data.role || user.role;

            await user.save();

            return user;
        } catch (error) {
            // إذا كان الخطأ نفسه يحمل statusCode، استخدمه، وإلا استخدم خطأ جديد
            if (error instanceof CustomError) throw error;
            throw new CustomError(error.message, 500);
        }
    }



    async deleteUser(id) {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) throw new CustomError('User not found', 404);

            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new CustomError(error.message || 'Error deleting user', error.statusCode || 500);
        }
    }

}

module.exports = new UserRepository();
