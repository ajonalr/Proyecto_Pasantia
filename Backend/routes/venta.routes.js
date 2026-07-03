const express = require('express');
const router = express.Router();
const { storeVenta, getVentas, getVentaByFactura, deleteVenta, updateVenta } = require('../controllers/venta.controllers');
const authGuard = require('../middlewares/jwt.guard');

router.get('/', getVentas);
router.post('/store', authGuard, storeVenta);
router.get('/factura/:factura', authGuard, getVentaByFactura);
router.delete('/:id', authGuard, deleteVenta);
router.put('/:id', authGuard, updateVenta);


module.exports = router;
