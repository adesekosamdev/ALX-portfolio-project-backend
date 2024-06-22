// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Budget = require('./budget');
const BudgetItem = require('./budgetItem');

// Define relationships
User.hasMany(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });
Budget.hasMany(BudgetItem, { foreignKey: 'budgetId' });
BudgetItem.belongsTo(Budget, { foreignKey: 'budgetId' });

const db = {
  User,
  Budget,
  BudgetItem,
  sequelize
};

module.exports = db;
