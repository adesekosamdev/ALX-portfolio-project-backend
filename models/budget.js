// models/budget.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Budget = sequelize.define('Budget', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
  budgetId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ['userId', 'id'],
  //   },
  // ],
  hooks: {
    beforeCreate: async (budget, options) => {
      const lastBudget = await Budget.findOne({
        where: { userId: budget.userId },
        order: [['createdAt', 'DESC']]
      });
    
      if (lastBudget) {
        const lastBudgetId = lastBudget.budgetId.split('.')[1];
        budget.budgetId = `${budget.userId}.${parseInt(lastBudgetId) + 1}`;
      } else {
        budget.budgetId = `${budget.userId}.1`;
      }
    }
  }
});

module.exports = Budget;
