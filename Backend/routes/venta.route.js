

const express = require('express');
const router = express.Router();
const { storeVenta } = require('../controllers/venta.controllers');



router.post('/store', storeVenta);


module.exports = router;
