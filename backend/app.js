const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

// Configurar el archivo de variables de entorno
if(process.env.NODE_ENV==="PRODUCTION") require('dotenv').config({path:'backend/config/config.env'})

// Uso de constantes importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// Config modo de trabajo
if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// MiddleWare para manejar errores
app.use(errorMiddleware)

module.exports = app;