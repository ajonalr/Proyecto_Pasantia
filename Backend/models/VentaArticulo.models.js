const { sequelize, DataTypes } = require('sequelize');
const Sequelize = require("../database/connection"); 

const VentaArticulo = Sequelize.define('VentaArticulo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,   
    },
    precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

module.exports = VentaArticulo; 