const { sequelize, DataTypes } = require('sequelize');
const Sequelize = require("../database/connection");

const Articulo = Sequelize.define("articulo", { 
   
    codigo: {
        type: DataTypes.INTEGER, // o es string, dependiendo de cómo quieras manejarlo
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
        type: DataTypes.DECIMAL(10, 2), // o DataTypes.FLOAT, dependiendo de tus necesidades
        allowNull: false,
    },
});

module.exports = Articulo;