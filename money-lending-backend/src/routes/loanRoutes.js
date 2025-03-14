const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

router.get('/test', (req, res) => {
  res.json({ message: 'Loan API is working' });
});

router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const loan = new Loan({
    type: req.body.type,
    name: req.body.name,
    amount: req.body.amount,
    interest: req.body.interest,
    dueDate: req.body.dueDate,
    status: req.body.status || 'active',
    borrower: req.body.borrower,
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
