const express = require('express');
const router = express.Router();
const { storeVenta } = require('../controllers/venta.controllers');
const { soloGet } = require('../middlewares/validaciones.middleware')





router.post('/store', soloGet, storeVenta);


module.exports = router;
