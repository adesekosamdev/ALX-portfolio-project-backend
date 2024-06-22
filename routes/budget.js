// routes/budget.js
const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

// Create a new budget
router.post('/create',
	[
		auth,
		body('userId').isInt().withMessage('User ID must be an integer'),
		body('name').notEmpty().withMessage('Name is required'),
		body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be a positive number'),
		body('description').notEmpty().withMessage('Description is required')
	],
	validate,
	budgetController.createBudget
);

// i need to update here, there are bugs with param (budgetId)
// Update an existing budget
router.put('/:budgetId', 
	[
		auth,
		param('budgetId').isInt().withMessage('Budget ID must be an integer'),
		body('name').notEmpty().withMessage('Name is required'),
		body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be a positive number'),
		body('description').notEmpty().withMessage('Description is required')
	],
	validate,
	budgetController.updateBudget
);

// Delete a budget
router.delete('/:budgetId', [param('budgetId').isInt().withMessage('Budget ID must be an integer')], validate, budgetController.deleteBudget);

// List all budgets
router.get('/', 
	auth,
	budgetController.getAllBudgets
);

// List all budgets for a particular user
router.get('/uBudgets/:userId', 
	[
		auth,
		param('userId').isInt().withMessage('User ID must be an integer'),
	],
	validate,
	budgetController.getAllUserBudgets
);

module.exports = router;
