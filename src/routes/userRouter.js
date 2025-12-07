const express = require('express');
const { register, login, profile } = require('../controllers/userController');
const authMiddleWare = require('../../middleWare/authMiddleWare');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleWare, profile);

module.exports = router;
