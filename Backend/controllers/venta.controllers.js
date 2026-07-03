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

const getVentaByFactura = async (req, res) => {
  try {
    const { factura } = req.params;
    const ventas = await venta.findAll({
      where: { factura: factura }
    });
    if (ventas.length === 0) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    res.status(200).json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la factura' });
  }
};

const storeVenta = async (req, res) => {
  try {
    const { productos } = req.body; 
    const codigoFactura = `FAC-${Date.now()}`;
    
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

const buscarVentaOError = async (id) => {
  const ventaExistente = await venta.findByPk(id);
  if (!ventaExistente) {
    throw new Error('Venta no encontrada');
  }
  return ventaExistente;
};

const deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const ventaExistente = await buscarVentaOError(id);
    const numeroFactura = ventaExistente.factura;

    const articulosEnFactura = await venta.findAll({ 
      where: { factura: numeroFactura } 
    });
   
    for (const item of articulosEnFactura) {
      const articuloToUpdate = await articulo.findByPk(item.articuloId);
      
      if (articuloToUpdate) {
        articuloToUpdate.stock = articuloToUpdate.stock + item.cantidad;
        await articuloToUpdate.save();
      }
    }
    await venta.destroy({ where: { factura: numeroFactura } });
    res.status(200).json({ 
      message: `Venta con factura ${numeroFactura} eliminada y stock restaurado exitosamente`});
  } catch (error) {
    console.error(error);
    const status = error.message === 'Venta no encontrada' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

const updateVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaCantidad } = req.body;
    const ventaExistente = await buscarVentaOError(id);

  
    const articuloToUpdate = await articulo.findByPk(ventaExistente.articuloId);
    if (articuloToUpdate) {
      articuloToUpdate.stock = articuloToUpdate.stock + ventaExistente.cantidad - nuevaCantidad;
      await articuloToUpdate.save();
    }

    await ventaExistente.update({
      cantidad: nuevaCantidad,
      total: nuevaCantidad * ventaExistente.precioVenta // Recalculamos el total automáticamente
    });

    res.status(200).json({ message: 'Venta modificada y stock ajustado con éxito', ventaExistente });
  } catch (error) {
    console.error(error);
    const status = error.message === 'Venta no encontrada' ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

module.exports = {
  storeVenta, 
  getVentas, 
  getVentaByFactura,
  deleteVenta,
  updateVenta
};
