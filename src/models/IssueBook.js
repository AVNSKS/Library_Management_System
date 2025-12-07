const mongoose = require('mongoose');

const IssueBookScheme = new mongoose.Schema({
  bookId: { type: String, required: true },
  bookName: { type: String, required: true },
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  issueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['ISSUED', 'RETURNED'],
    default: 'ISSUED',
    required: true,
  },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model('IssueBook', IssueBookScheme);
