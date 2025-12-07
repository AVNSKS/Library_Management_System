const express = require('express');
const authMiddleWare = require('../../middleWare/authMiddleWare');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', authMiddleWare, createBook);
router.put('/:id', authMiddleWare, updateBook);
router.delete('/:id', authMiddleWare, deleteBook);

module.exports = router;
