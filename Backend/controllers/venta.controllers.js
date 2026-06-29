const venta = require('../models/venta.models');
const articulo = require('../models/articulo.models');
const { updateArticulo } = require('./articulo.controllers');


const storeVenta = async (req, res) => {

  // TODO: hacer que se cree una factura co un codigo unico para agrupar venta (uuid)


  try {
    const {cantidad,precioUnitario,precioVenta,descuento,total,articuloId,clienteId} = req.body;
    const ventaStore = await venta.create({
      cantidad,
      precioUnitario,
      precioVenta,
      descuento,
      total,
      articuloId,
      clienteId
    });

    const articuloToUpdate = await articulo.findByPk(articuloId);
    if (!articuloToUpdate) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }
    articuloToUpdate.stock -= cantidad;
    await articuloToUpdate.save();
    
    res.status(201).json({ message: 'Venta creada exitosamente', ventaId: ventaStore.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la venta' });
  }

}


module.exports = {
  storeVenta
};  

