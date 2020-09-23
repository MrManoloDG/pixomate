const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Companie = sequelize.define('Companie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cif: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            is: /([a-z]|[A-Z])[0-9]{8}/i
        }
    },
    shortdesc: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: { len: [0,100] }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    ccc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    logo: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
},{
    tableName: 'companies'
});

sequelize.sync();

module.exports = Companie;