const app = require('./app');

// Establecemos el archivo de configuracion
const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});

// Iniciamos el servidor
const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`);
});