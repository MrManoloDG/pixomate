const { Sequelize } = require('sequelize');
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize('pixomaticmdg', dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});

module.exports = sequelize;