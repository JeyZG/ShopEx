const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// Establecemos el archivo de configuracion
dotenv.config({path: './backend/config/config.env'});

// Configuracion de la base de datos
connectDatabase();

// Iniciamos el servidor
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at port [${process.env.PORT}] in [${process.env.NODE_ENV}] mode`);
});