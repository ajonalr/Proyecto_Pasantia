const { sequelize, DataTypes } = require('sequelize');
const Sequelize = require("../database/connection"); 

const Venta = Sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,        
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    }
    });

module.exports = Venta;