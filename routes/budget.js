// routes/budget.js
const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

// Create a new budget
router.post('/',
	[
		auth,
		body('userId').isInt().withMessage('User ID must be an integer'),
		body('title').notEmpty().withMessage('Title is required'),
		body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
		body('details').notEmpty().withMessage('Details are required')
	],
	validate,
	budgetController.createBudget
);

// Update an existing budget
router.put('/:id', 
	[
		auth,
		param('id').isInt().withMessage('Budget ID must be an integer'),
		body('title').notEmpty().withMessage('Title is required'),
		body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
		body('details').notEmpty().withMessage('Details are required')
	],
	validate,
	budgetController.updateBudget);

// Delete a budget
router.delete('/:id', [param('id').isInt().withMessage('Budget ID must be an integer')], validate, budgetController.deleteBudget);

// List all budgets
router.get('/', 
	auth,
	budgetController.getAllBudgets
);

module.exports = router;
