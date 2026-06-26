const User = require('./user.models');
const Cliente = require('./cliente.models');
const Articulo = require('./articulo.models');
const Venta = require('./venta.models');
const VentaArticulo = require('./VentaArticulo.models');

const relations = () => {

Cliente.hasMany(Venta, { foreignKey: 'clienteId' });
Venta.belongsTo(Cliente, { foreignKey: 'clienteId' });

Venta.hasMany(VentaArticulo, { foreignKey: 'ventaId' });
VentaArticulo.belongsTo(Venta, { foreignKey: 'ventaId' });

Articulo.hasMany(VentaArticulo, { foreignKey: 'articuloId' });
VentaArticulo.belongsTo(Articulo, { foreignKey: 'articuloId' });

}

module.exports = relations;
