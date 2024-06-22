// routes/budget.js
const express = require('express');
const router = express.Router();
const budgetItemController = require('../controllers/budgetItemController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

// Create a new budget item
router.post('/create',
	[
		auth,
		body('budgetId').notEmpty().withMessage('Budget ID is required'),
		body('name').notEmpty().withMessage('Name is required'),
		body('category').notEmpty().withMessage('Category is required'),
		body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
		// body('status').isIn(['spent', 'not spent']).withMessage('Status must be either "spent" or "not spent"')
	],
	validate,
	budgetItemController.createBudgetItem
);

// Update an existing budget
router.put('/:id', 
	[
		auth,
		param('itemId').notEmpty().withMessage('Budget item ID must be an integer'),
		body('name').notEmpty().withMessage('Name is required'),
		body('category').notEmpty().withMessage('Category is required'),
		body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
		body('status').isIn(['spent', 'not spent']).withMessage('Status must be either "spent" or "not spent"')
	],
	validate,
	budgetItemController.updateBudgetItem);

// Delete a budget
router.delete('/:itemId', [param('itemId').notEmpty().withMessage('Budget item ID must be an integer')], validate, budgetItemController.deleteBudgetItem);

// List all budgets
router.get('/', 
	auth,
	budgetItemController.getAllBudgetItems
);

module.exports = router;
