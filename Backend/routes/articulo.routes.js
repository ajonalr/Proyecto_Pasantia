const express = require('express');
const router = express.Router();
const articuloControllers = require('../controllers/articulo.controllers');

router.get('/', articuloControllers.getAllArticulos);

router.get('/:codigo', articuloControllers.getArticuloById);
router.post('/', articuloControllers.createArticulo);
router.put('/:codigo', articuloControllers.updateArticulo);
router.delete('/:codigo', articuloControllers.deleteArticulo);

module.exports = router;
