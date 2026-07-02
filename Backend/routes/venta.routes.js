const express = require('express');
const router = express.Router();
const { storeVenta, getVentas, getVentaByFactura } = require('../controllers/venta.controllers');
const authGuard = require('../middlewares/jwt.guard');

router.get('/', getVentas);
router.post('/store', authGuard, storeVenta);
router.get('/factura/:factura', authGuard, getVentaByFactura);



module.exports = router;
