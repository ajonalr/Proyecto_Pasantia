require('dotenv').config(); 
const express = require('express'); 
const morgan = require('morgan');

const sequelize = require('./database/connection'); 
const app = express(); 
const PORT = process.env.PORT || 3000; 

// Importamos todos los modelos
const User = require('./models/user.models'); 
const Cliente = require('./models/cliente.models');
const Articulo = require('./models/articulo.models'); 
const Venta = require('./models/venta.models'); 
const VentaArticulo = require("./models/VentaArticulo.models");

// definimos las relaciones entre los modelos

Cliente.hasMany(Venta, { foreignKey: 'clienteId' });
Venta.belongsTo(Cliente, { foreignKey: 'clienteId' });

Venta.hasMany(VentaArticulo, { foreignKey: 'ventaId' });
VentaArticulo.belongsTo(Venta, { foreignKey: 'ventaId' });

Articulo.hasMany(VentaArticulo, { foreignKey: 'articuloId' });
VentaArticulo.belongsTo(Articulo, { foreignKey: 'articuloId' });

// Sincronizamos los modelos con la base de datos
sequelize.sync(
    { force: false }
).then(() => {
    console.log('Base de datos conectada');
}).catch((error) => {
    console.error('Base de datos no esta conectada:', error);
    });

app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Servidor esta corriendo en el puerto ${PORT}`);
}); 

