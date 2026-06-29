const { sequelize, DataTypes } = require('sequelize');
const Sequelize = require("../database/connection");

const Articulo = Sequelize.define("articulo", { 
   
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    precio_costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = Articulo;