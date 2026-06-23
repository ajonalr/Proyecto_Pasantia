require('dotenv').config(); // llama a dotenv para que lea el archivo .env y cargue las variables de entorno

const express = require('express'); // llama a express para crear el servidor
const morgan = require('morgan');// llama a morgan para registrar las solicitudes HTTP en la consola

const sequelize = require('./database/connection'); // llama a la conexión de la base de datos
const app = express(); // crea una instancia de express
const PORT = process.env.PORT || 3000; // define el puerto en el que se ejecutará el servidor, si no se define en el archivo .env, se usará el puerto 3000 por defecto

const User = require('./models/user.models'); // llama al modelo de usuario
const Cliente = require('./models/cliente.models');
const Articulo = require('./models/articulo.models'); // llama al modelo de articulo


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

// Define your routes here
// Example: app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Servidor esta corriendo en el puerto ${PORT}`);
}); 

