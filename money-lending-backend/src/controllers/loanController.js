const Loan = require('../models/Loan');
//get all loans
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//create loan
exports.createLoan = async (req, res) => {
  const { borrower, amount, interestRate, dueDate } = req.body;
  try {
    const loan = new Loan({
      borrower,
      amount,
      interestRate,
      dueDate,
    });
    const savedLoan = await loan.save();
    res.status(201).json(savedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
