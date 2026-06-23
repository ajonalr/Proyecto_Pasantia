const { DataTypes } = require("sequelize"); 
const Sequelize = require("../database/connection"); // Import the Sequelize instance from the connection file
const bcrypt = require("bcrypt"); // 

const User = Sequelize.define("user", {
  // --- AQUÍ VAN SOLO LAS COLUMNAS ---
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }, // Cerramos bien el ID aquí
  fotografia: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.TEXT, 
    allowNull: false,
  }
}, {

  defaultScope: { 
    attributes: { exclude: ['contrasena'] },  // Exclude the password field by default
  },
  hooks: { // Define hooks for password hashing
    beforeCreate: async (user) => {  // Hook to hash the password before creating a new user
      if (user.contrasena) { // Check if the password field is present
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        user.contrasena = await bcrypt.hash(user.contrasena, salt); // Hash the password using bcrypt and the generated salt
      }
    },
    beforeUpdate: async (user) => { 
      if (user.changed('contrasena')) {
        const salt = await bcrypt.genSalt(10);
        user.contrasena = await bcrypt.hash(user.contrasena, salt);
      }
    }
  }
});

module.exports = User;