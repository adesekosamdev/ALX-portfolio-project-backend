// controllers/budgetController.js
const { Budget } = require('../models');

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const budgetId = "";
    const { userId, name, totalAmount, description } = req.body;
    const budget = await Budget.create({ budgetId, userId, name, totalAmount, description });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing budget
exports.updateBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const { name, totalAmount, description } = req.body;
    const budget = await Budget.findByPk(budgetId);
    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    budget.name = name;
    budget.totalAmount = totalAmount;
    budget.description = description;
    await budget.save();
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findByPk(budgetId);
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

// List all budgets for a specific user
exports.getAllUserBudgets = async (req, res) => {
  console.log(req.params);
  try {
    const { userId } = req.params;
    const userBudgets = await Budget.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(userBudgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
