// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, param } = require('express-validator');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

// Routes for user operations
router.post('/',
	auth,
	[
		body('username').notEmpty().withMessage('Userame is required'),
		body('email').isEmail().withMessage('Valid email is required')
	],
	validate, 
	userController.createUser
);

// Update User
router.put(
	'/:id',
	auth,
	[
	  body('username').optional().notEmpty().withMessage('Username cannot be empty'),
	  body('email').optional().isEmail().withMessage('Valid email is required')
	],
	validate,
	userController.updateUser
);

// Delete a user
router.delete('/:id',
	auth,
	userController.deleteUser
);

// List all users
router.get('/',
	auth,
	userController.getAllUsers
);

// get user info
router.get('/user-info', 
	auth, (req, res) => {
    // Assuming `req.user` has the user info from the JWT token
    res.json({
        userId: req.user.userId,
        // email: req.user.email,
        // name: req.user.name
    });
});

module.exports = router;
