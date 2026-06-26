const express = require('express');
const router = express.Router();
const articuloControllers = require('../controllers/articulo.controllers');
const { validarStock } = require('../middlewares/articulo.middleware')

router.get('/', articuloControllers.getAllArticulos);
router.get('/:codigo', articuloControllers.getArticuloById);
// Usar validarStock para crear artículos
router.post('/', validarStock, articuloControllers.createArticulo);
router.put('/:codigo', articuloControllers.updateArticulo);
router.delete('/:codigo', articuloControllers.deleteArticulo);


module.exports = router;
