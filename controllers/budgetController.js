// controllers/budgetController.js
const { Budget, User } = require('../models');

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { title, amount, userId, details } = req.body;
    const budget = await Budget.create({ title, amount, userId, details });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing budget
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, details } = req.body;
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    budget.title = title;
    budget.amount = amount;
    budget.details = details;
    await budget.save();
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findByPk(id);
    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    await budget.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List all budgets
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
