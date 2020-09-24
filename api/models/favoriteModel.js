const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Companie = sequelize.models.Companie;

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

Favorite.belongsTo(Companie, {foreignKey: 'id_companie'});
sequelize.sync();

module.exports = Favorite;