const express=require("express");
const router= express.Router();

// Traemos la respuesta JSON desde el controlador
const { registroUsuario, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword } = require("../controllers/authController");
// Nos traemos los metodos usados en el MiddleWare
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Establecemos la ruta para registrar un nuevo usuario
router.route('/usuario/registro').post(registroUsuario)

// Establecemos la ruta para iniciar sesion
router.route('/login').get(loginUser)

// Establecemos la ruta para ver la info del usuario logueado
router.route('/myAccount').get(isAuthenticatedUser, getUserProfile)

// Establecemos la ruta para cerrar sesion del usuario logueado
router.route('/logout').get(isAuthenticatedUser, logoutUser)

// Establecemos la ruta para solicitar cambio por password olvidado
router.route('/forgotPassword').post(forgotPassword)

// Establecemos la ruta para cambiar la contraseña despues de hacer la solicitud de cambio
router.route('/resetPassword/:token').post(resetPassword)

// Establecemos la ruta para actualizar la contraseña sin haberla olvidado
router.route('/myAccount/updatePassword').put(isAuthenticatedUser, updatePassword)

module.exports= router