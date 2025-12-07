// const express = require('express');
const IssueBook = require('../models/IssueBook');
const Book = require('../models/Books');
const User = require('../models/User');

const issueBook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res.status(403).json({ message: 'Access Denied to issue book' });
    }
    const { bookId, bookName, studentId, studentName, issueDate, returnDate } =
      req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not Found' });
    }
    if (book.quantity < 1) {
      return res.status(404).json({ message: 'Book is not available' });
    }
    const newIssueBook = {
      bookId,
      bookName,
      studentId,
      studentName,
      issueDate,
      returnDate,
      status: 'ISSUED',
      createdAt: new Date(),
    };
    const issueBook = new IssueBook(newIssueBook);
    await issueBook.save();

    book.quantity = book.quantity - 1;
    await book.save();

    res.status(201).json({ message: 'book was issued', data: issueBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const returnbook = async (req, res) => {
  try {
    if (req.user.role === 'STUDENT') {
      return res
        .status(403)
        .json({ message: 'Access Denied to return a book' });
    }
    const issueBook = await IssueBook.findById(req.params.id);
    if (!issueBook) {
      return res.status(404).json({ message: 'Issued Book not found' });
    }
    if (issueBook.status === 'RETURNED') {
      return res.status(400).json({ message: 'Book already returned' });
    }
    issueBook.status = 'RETURNED';
    await issueBook.save();

    const book = await Book.findById(issueBook.bookId);
    book.quantity = book.quantity + 1;
    await book.save();

    res
      .status(200)
      .json({ message: 'Book returned successfully', data: issueBook });
  } catch (Error) {
    res.status(500).json({ message: Error.message });
  }
};

module.exports = { issueBook, returnbook };
