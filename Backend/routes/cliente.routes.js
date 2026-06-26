const express = require('express');
const router = express.Router();
const clienteControllers = require('../controllers/cliente.controllers');


router.get('/', clienteControllers.getAllClientes);
router.get('/:id', clienteControllers.getClienteById);
router.post('/', clienteControllers.createCliente);
router.put('/:id', clienteControllers.updateCliente);
router.delete('/:id', clienteControllers.deleteCliente);

module.exports = router;
