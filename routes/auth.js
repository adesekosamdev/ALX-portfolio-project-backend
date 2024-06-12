// routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

router.post(
	'/register',
	[
	//   body('username').notEmpty().withMessage('Username is required'),
	  body('email').isEmail().withMessage('Valid email is required'),
	  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
	],
	validate,
	authController.register
);
  
router.post(
	'/login',
	[
	  body('email').isEmail().withMessage('Valid email is required'),
	  body('password').notEmpty().withMessage('Password is required')
	],
	validate,
	authController.login
);

router.post(
	'/logout',
	authController.logout
);
  
module.exports = router;
