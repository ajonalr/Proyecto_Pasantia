const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const articuloRoutes = require('./articulo.routes');
const clienteRoutes = require('./cliente.routes');
const ventaRoutes = require('./venta.route');

router.use('/users', userRoutes);
router.use('/articulos', articuloRoutes);
router.use('/clientes', clienteRoutes);
router.use('/ventas', ventaRoutes);

module.exports = router;
