const express = require('express');
const app = express();

app.use(express.json());

// Importar las rutas de los productos
const productos = require('./routes/products');

// Ruta inicial
app.use('/api', productos);

module.exports = app;