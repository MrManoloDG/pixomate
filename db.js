const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pixomaticmdg', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;