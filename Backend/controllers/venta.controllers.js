const venta = require('../models/venta.models');
const ventaArticulo = require('../models/VentaArticulo.models');
const articulo = require('../models/articulo.models');

const crearVenta = async (req, res) => {
  try {
    const { clienteId, articulos } = req.body;

    if (!articulos || articulos.length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron artículos para la venta.' });
    }
    
    let totalVenta = 0;
    const detallesParaGuardar = [];
    const articulosParaActualizar = [];

    for (const item of articulos) {
      const articuloEncontrado = await articulo.findByPk(item.articuloId);
      if (!articuloEncontrado) {
        return res.status(404).json({ error: `Artículo con ID ${item.articuloId} no encontrado.` });
      }
      
      if (articuloEncontrado.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para el artículo con ID ${item.articuloId}.` });
      } 

      const precioUnitario = articuloEncontrado.precio;
      const subTotal = precioUnitario * item.cantidad;
      totalVenta += subTotal;

        detallesParaGuardar.push({
            articuloId: item.articuloId,
            cantidad: item.cantidad,
            precioUnitario,
            sub_total: subTotal,
        }); 

        articulosParaActualizar.push({  
        artirculo: articuloEncontrado,
        nuevostock: articuloEncontrado.stock - item.cantidad,
      });
    }
    
    const nuevaVenta = await venta.create({ 
        total: totalVenta,
        clienteId: clienteId,
    });

    for (const detalle of detallesParaGuardar) {
      await ventaArticulo.create({
        ...detalle,
        ventaId: nuevaVenta.id,
      });
    }

  for (const item of articulosParaActualizar) {
    await item.artirculo.update({ stock: item.nuevostock });
  }
  
    return res.status(201).json({ message: 'Venta creada exitosamente', ventaId: nuevaVenta.id });

} catch (error) {
    console.error('Error al crear la venta:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  crearVenta,
};  

