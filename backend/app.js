const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// Uso de constantes importadas
// app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(fileUpload());

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