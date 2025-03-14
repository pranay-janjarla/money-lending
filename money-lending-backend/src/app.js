require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const loanRoutes = require('./routes/loanRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const router = express.Router();
const Loan = require('./models/Loan');

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
