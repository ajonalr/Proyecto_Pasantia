const express = require('express');
const router = express.Router();
const clienteControllers = require('../controllers/cliente.controllers');
const { soloGet } = require('../middlewares/validaciones.middleware')


router.get('/', clienteControllers.getAllClientes);
router.get('/:id', clienteControllers.getClienteById);


router.post('/', soloGet, clienteControllers.createCliente);
router.put('/:id', soloGet, clienteControllers.updateCliente);
router.delete('/:id', soloGet, clienteControllers.deleteCliente);

module.exports = router;
