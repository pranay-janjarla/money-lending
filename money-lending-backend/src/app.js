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
