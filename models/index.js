// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Budget = require('./budget');

// Define relationships
User.hasMany(Budget, { foreignKey: 'userId' });
Budget.belongsTo(User, { foreignKey: 'userId' });

const db = {
  User,
  Budget,
  sequelize
};

module.exports = db;
