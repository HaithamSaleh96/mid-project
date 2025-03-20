const express = require('express');
const { register, login } = require('../controllers/AuthController');
const { createPost, getAllPosts, getPostById, getMyPosts, updatePost, deletePost } = require('../controllers/postController');
const { getAllUsers, createUser, updateUser, deleteUser, AdmingetAllPosts, AdmingetPostById, AdminupdatePost,AdmindeletePost,unblockUser } = require('../controllers/adminController');
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
router.get('/posts/Myposts', verifyToken, getMyPosts);
router.post('/posts', verifyToken, createPost);
router.get('/posts', verifyToken, getAllPosts);
router.get('/posts/:id', verifyToken, getPostById);

//auther and admin
router.put('/posts/:id', verifyToken, isOwnerOrAdmin, updatePost);
router.delete('/posts/:id', verifyToken, isOwnerOrAdmin, deletePost);


//admin
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.post('/users', verifyToken, isAdmin, createUser);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.put('/users/:id/unblock', verifyToken, isAdmin, unblockUser);

router.get('/admin/posts', verifyToken, isAdmin, AdmingetAllPosts);
router.get('/admin/posts/:id', verifyToken, isAdmin, AdmingetPostById);
router.put('/admin/posts/:id', verifyToken, isAdmin, AdminupdatePost);
router.delete('/admin/posts/:id', verifyToken, isAdmin, AdmindeletePost);


// router.post('/send-email', sendTestEmail);

// router.post('/delete', deleteUserLis);


module.exports = router;
