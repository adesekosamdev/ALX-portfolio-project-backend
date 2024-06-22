const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Budget = require('./budget');


const BudgetItem = sequelize.define('BudgetItem', {
	itemId: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	budgetId: {
		type: DataTypes.STRING,
		allowNull: false,
		references: {
			model: Budget,
			key: 'budgetId',
		},
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false
	},
	amount: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	status: {
		type: DataTypes.ENUM('spent', 'not spent'),
		defaultValue: 'not spent'
	},
}, {
	timestamps: true,
	hooks: {
	  beforeCreate: async (budgetItem, options) => {
		const lastBudgetItem = await BudgetItem.findOne({
		  where: { budgetId: budgetItem.budgetId },
		  order: [['createdAt', 'DESC']]
		});
	  
		if (lastBudgetItem) {
		  const lastBudgetItemId = lastBudgetItem.itemId.split('.')[2];
		  budgetItem.itemId = `${budgetItem.budgetId}.${parseInt(lastBudgetItemId) + 1}`;
		} else {
			budgetItem.itemId = `${budgetItem.budgetId}.1`;
		}
	  }
	}
});

module.exports = BudgetItem;
