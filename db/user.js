const Sequelize = require('sequelize');
const db = require('./db');

module.exports = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  bio: { type: Sequelize.STRING, allowNull: false },
  rank: { type: Sequelize.INTEGER, allowNull: false },
});
