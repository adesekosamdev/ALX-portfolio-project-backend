// controllers/budgetItemController.js
const { BudgetItem } = require('../models');

// Create a new budget Item
exports.createBudgetItem = async (req, res) => {
	try {
		const itemId = "";
		const { budgetId, name, category, amount } = req.body;
		const budgetItem = await BudgetItem.create({ itemId, budgetId, name, category, amount });
		res.status(201).json(budgetItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Update an existing budget item
exports.updateBudgetItem = async (req, res) => {
	try {
	  const { itemId } = req.params;
	  const { name, category, amount, status } = req.body;
	  const budgetItem = await BudgetItem.findByPk(itemId);
	  if (!budgetItem) {
		return res.status(404).json({ error: 'Budget item not found' });
	  }
	  budgetItem.name = name;
	  budgetItem.category = category;
	  budgetItem.amount = amount;
	  budgetItem.status =
	  await budgetItem.save();
	  res.json(budgetItem);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

// Delete a budget item
exports.deleteBudgetItem = async (req, res) => {
	try {
	  const { itemId } = req.params;
	  const budgetItem = await BudgetItem.findByPk(itemId);
	  if (!budgetItem) {
		return res.status(404).json({ error: 'Budget item not found' });
	  }
	  await budgetItem.destroy();
	  res.status(204).json();
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

// List all budgets items
exports.getAllBudgetItems = async (req, res) => {
	try {
	  const budgetItems = await BudgetItem.findAll();
	  res.json(budgetItems);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
};

// should add one to list all budget items for a particular budget and maybe even all for a particular user