const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      user,
      token: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'llave_secreta', { expiresIn: '2h' })
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };