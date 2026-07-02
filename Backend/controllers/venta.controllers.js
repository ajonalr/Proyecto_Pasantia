const venta = require('../models/venta.models');
const articulo = require('../models/articulo.models');


const getVentas = async (req, res) => {
  try {
    const ventas = await venta.findAll({});
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
  }
};

// 2. Buscar artículos por número de factura
const getVentaByFactura = async (req, res) => {
  try {
    const { factura } = req.params;
    const ventas = await venta.findAll({
      where: { factura: factura }
    });
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la factura' });
  }
};

// 3. Crear la venta (Agrupando con el mismo código de factura)
const storeVenta = async (req, res) => {
  try {
    const { productos } = req.body; 
    const codigoFactura = `FAC-${Date.now()}`; // Un solo código idéntico para toda la compra
    
    for (const item of productos) {
      await venta.create({
        factura: codigoFactura,
        cantidad: item.cantidad,
        precioCosto: item.precioCosto,
        precioVenta: item.precioVenta,
        descuento: item.descuento,
        total: item.total,
        articuloId: item.articuloId,
        clienteId: item.clienteId
      });

      const articuloToUpdate = await articulo.findByPk(item.articuloId);
      articuloToUpdate.stock = articuloToUpdate.stock - item.cantidad;
      await articuloToUpdate.save();
    }

    res.status(201).json({ message: 'Venta creada exitosamente', factura: codigoFactura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la venta' }); 
  }
};

// Exportamos las TRES funciones para que Express las reconozca
module.exports = {
  storeVenta, 
  getVentas, 
  getVentaByFactura
};