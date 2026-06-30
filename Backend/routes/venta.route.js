const express = require('express');
const router = express.Router();
const { storeVenta } = require('../controllers/venta.controllers');
const authGuard = require('../middlewares/jwt.guard');





router.post('/store', authGuard, storeVenta);


module.exports = router;
