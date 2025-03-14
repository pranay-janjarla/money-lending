const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['given', 'taken'],
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  },

  borrower: {
    type: String,
    required: true,
    enum: ['me', 'other'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Loan', LoanSchema);
