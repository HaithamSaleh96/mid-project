const LoginAttempt = require('../models/LoginAttempt');
const CustomError = require('../utils/CustomError');

class LoginAttemptRepository {
    // إنشاء محاولة تسجيل دخول جديدة
    async createLoginAttempt(data) {
        try {
            const loginAttempt = new LoginAttempt(data);
            return await loginAttempt.save();
        } catch (error) {
            throw new CustomError(error.message || 'Error creating login attempt', 500);
        }
    }

    // الحصول على محاولة تسجيل الدخول بناءً على user_id
    async getLoginAttemptByUserId(userId) {
        try {
            return await LoginAttempt.findOne({ user_id: userId });
        } catch (error) {
            throw new CustomError(error.message || 'Error fetching login attempt by user ID', 500);
        }
    }

    // تحديث محاولة تسجيل الدخول بناءً على user_id
    async updateLoginAttempt(userId, data) {
        try {
            return await LoginAttempt.findOneAndUpdate({ user_id: userId }, data, { new: true });
        } catch (error) {
            throw new CustomError(error.message || 'Error updating login attempt', 500);
        }
    }

    // حذف محاولات تسجيل الدخول بناءً على user_id
    async deleteLoginAttempt(userId) {
        try {
            return await LoginAttempt.deleteOne({ user_id: userId });
        } catch (error) {
            throw new CustomError(error.message || 'Error deleting login attempt', 500);
        }
    }

    // حذف جميع محاولات تسجيل الدخول (استخدام حذر)
    async deleteAllLoginAttempts() {
        try {
            return await LoginAttempt.deleteMany({});
        } catch (error) {
            throw new CustomError(error.message || 'Error deleting all login attempts', 500);
        }
    }
}

module.exports = new LoginAttemptRepository();
