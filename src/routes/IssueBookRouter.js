const express = require('express');
const authMiddleWare = require('../../middleWare/authMiddleWare');
const { issueBook, returnbook } = require('../controllers/issueBookController');

const router = express.Router();

router.post('/', authMiddleWare, issueBook);
router.put('/:id', authMiddleWare, returnbook);

module.exports = router;
