// server.js
const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user');
const budgetRoutes = require('./routes/budget');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const cors = require('cors');

const app = express();

// cors setup
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/auth', authRoutes);

// Sync database and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
