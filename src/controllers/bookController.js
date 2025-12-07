const Book = require('../models/Books');

const books = [];

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res.status(403).json({ message: 'Access Denied' });
    }
    const { title, author, publishedYear, price, quantity } = req.body;
    if (!title || !author || !publishedYear || !price || !quantity) {
      return res.status(400).json({ message: 'please provide all the fields' });
    }

    const book = new Book({
      title,
      author,
      publishedYear,
      price,
      quantity,
      status: 'AVAILABLE',
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res.status(403).json({ message: 'Access Denied' });
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book Not Found' });
    }

    const { title, author, publishedYear, price, quantity, status } = req.body;

    // Allow partial updates
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (publishedYear !== undefined) book.publishedYear = publishedYear;
    if (price !== undefined) book.price = price;
    if (quantity !== undefined) book.quantity = quantity;
    if (status !== undefined) book.status = status;

    const updatedBook = await book.save();
    res
      .status(200)
      .json({ message: 'Book Updated Successfully', data: updatedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res
        .status(403)
        .json({ message: 'Access Denied to delete the book' });
    }
    const bookIndex = await Book.findByIdAndDelete(req.params.id);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book Not Found' });
    }
    books.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book Deleted SuccessFully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
