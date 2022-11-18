const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// Establecemos el archivo de configuracion de variables de entorno
//const dotenv = require('dotenv')
//dotenv.config({path: './backend/config/config.env'});
if(process.env.NODE_ENV!=="PRODUCTION") require('dotenv').config({path:'backend/config/config.env'})

// Llamamos al Metodo que hace la configuracion de la base de datos
connectDatabase();

// Configuracion de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Iniciamos el servidor
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at port [${process.env.PORT}] in [${process.env.NODE_ENV}] mode`);
});