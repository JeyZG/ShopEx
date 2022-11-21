const express=require("express");
const router= express.Router();

// Traemos la respuesta JSON desde el controlador
const { registroUsuario, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails, updateUser, deleteUser } = require("../controllers/authController");
// Nos traemos los metodos usados en el MiddleWare
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Establecemos la ruta para registrar un nuevo usuario
router.route('/usuario/registro').post(registroUsuario)

// Establecemos la ruta para iniciar sesion
router.route('/login').post(loginUser)

// Establecemos la ruta para ver la info del usuario logueado
router.route('/myAccount').get(isAuthenticatedUser, getUserProfile)

// Establecemos la ruta para cerrar sesion del usuario logueado
router.route('/logout').get(isAuthenticatedUser, logoutUser)

// Establecemos la ruta para solicitar cambio por password olvidado
router.route('/forgotPassword').post(forgotPassword)

// Establecemos la ruta para cambiar la contraseña despues de hacer la solicitud de cambio y usar el link del email
router.route('/resetPassword/:token').post(resetPassword)

// Establecemos la ruta para actualizar la contraseña sin haberla olvidado
router.route('/myAccount/updatePassword').put(isAuthenticatedUser, updatePassword)

// Establecemos la ruta para actualizar el perfil de usuario
router.route('/myAccount/updateProfile').put(isAuthenticatedUser, updateProfile)

// METODOS CONTROLADOS PARA USUARIO ADMIN

// Establecemos la ruta para ver todos los usuarios desde el rol admin
router.route('/admin/allUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)

// Establecemos la ruta para ver los detalles de un usuario desde el rol admin
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)

// Establecemos la ruta para actualizar la info de un usuario desde el rol admin
router.route('/admin/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)

// Establecemos la ruta para eliminar un usuario desde el rol admin
router.route('/admin/deleteUser/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports= router