const express = require('express');
const { register, login } = require('../controllers/AuthController');
const { createPost, getAllPosts, getPostById, getMyPosts, updatePost, deletePost } = require('../controllers/userController');
const { getAllUsers, createUser, updateUser, deleteUser, AdmingetAllPosts, AdmingetPostById, AdminupdatePost, AdmindeletePost, unblockUser } = require('../controllers/adminController');
const { sendTestEmail } = require('../controllers/emailController');
const { deleteUserLis } = require('../listeners/SendEmailListener');


const verifyToken = require('../middlewares/authMiddleware');
const isOwnerOrAdmin = require('../middlewares/isOwnerOrAdmin');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();
//Auth
router.post('/register', register);
router.post('/login', login);

//user
router.get('/user/posts/Myposts', verifyToken, getMyPosts);
router.post('/user/posts', verifyToken, createPost);
router.get('/user/posts', verifyToken, getAllPosts);
router.get('/user/posts/:id', verifyToken, getPostById);

//auther and admin
router.put('/user/posts/:id', verifyToken, isOwnerOrAdmin, updatePost);
router.delete('/user/posts/:id', verifyToken, isOwnerOrAdmin, deletePost);


//admin 
router.get('/admin/users', verifyToken, isAdmin, getAllUsers);
router.post('/admin/users', verifyToken, isAdmin, createUser);
router.put('/admin/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/admin/users/:id', verifyToken, isAdmin, deleteUser);
router.put('/admin/users/:id/unblock', verifyToken, isAdmin, unblockUser);

router.get('/admin/posts', verifyToken, isAdmin, AdmingetAllPosts);
router.get('/admin/posts/:id', verifyToken, isAdmin, AdmingetPostById);
router.put('/admin/posts/:id', verifyToken, isAdmin, AdminupdatePost);
router.delete('/admin/posts/:id', verifyToken, isAdmin, AdmindeletePost);


// router.post('/send-email', sendTestEmail);


// router.post('/delete', deleteUserLis);


module.exports = router;
