const express = require('express');
const router = express.Router();
const articuloControllers = require('../controllers/articulo.controllers');
const { validarStock } = require('../middlewares/articulo.middleware')
const { soloGet } = require('../middlewares/validaciones.middleware')
const  authGuard  = require('../middlewares/jwt.guard');


router.get('/', articuloControllers.getAllArticulos);
router.get('/:codigo', articuloControllers.getArticuloById);


// Usar validarStock para crear artículos
router.post('/', soloGet, authGuard, articuloControllers.createArticulo);
router.post('/store', soloGet, authGuard, articuloControllers.createArticulo);
router.put('/:codigo', soloGet, articuloControllers.updateArticulo);
router.delete('/:codigo', soloGet, articuloControllers.deleteArticulo);


module.exports = router;
