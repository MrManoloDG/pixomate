const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Company = sequelize.models.Company;

const Favorite = sequelize.define('Favorite', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'favorites'
});

Favorite.belongsTo(Company, {foreignKey: 'id_company'});
sequelize.sync();

module.exports = Favorite;