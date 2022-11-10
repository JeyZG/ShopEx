const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors')
const cookieParser = require('cookie-parser')

// Uso de constantes importadas
app.use(express.json());
app.use(cookieParser());

// Importar las rutas de los diferentes modelos
const productos = require('./routes/products');
const usuarios = require('./routes/auth');
const ordenes = require('./routes/orders');

// Usar las rutas de los diferentes modelos
app.use('/api', productos);
app.use('/api', usuarios);
app.use('/api', ordenes);

// MiddleWare para manejar errores
app.use(errorMiddleware)

module.exports = app;