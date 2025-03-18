const express = require('express');
const { register, login } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
