const Loan = require('../models/Loan');

exports.getUptrend = async (req, res) => {
  try {
    const loans = await Loan.find();
    const now = new Date();

    let monthlyIncome = 0;
    let monthlyExpense = 0;

    loans.forEach((loan) => {
      const dueDate = new Date(loan.dueDate);
      let monthsLeft = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24 * 30));
      if (monthsLeft < 1) monthsLeft = 1;

      const totalRepayment = loan.amount + loan.amount * (loan.interest / 100);
      const monthlyPayment = totalRepayment / monthsLeft;

      if (loan.borrower === 'other') {
        monthlyIncome += monthlyPayment;
      } else if (loan.borrower === 'me') {
        monthlyExpense += monthlyPayment;
      }
    });

    res.json({ monthlyIncome, monthlyExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
