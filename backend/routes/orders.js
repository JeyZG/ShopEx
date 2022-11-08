const express=require("express");
const { newOrder, getOneOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router= express.Router();

// Establecemos la ruta para registrar una nueva orden
router.route('/order/new').post(isAuthenticatedUser, newOrder)

// Establecemos la ruta para ver una orden propia segun su id
router.route('/order/:id').get(isAuthenticatedUser, getOneOrder)

// Establecemos la ruta para ver todas las ordenes de un usuario logueado
router.route('/myOrders').get(isAuthenticatedUser, myOrders)

// METODOS CONTROLADOS PARA USUARIO ADMIN

// Establecemos la ruta para ver todos las ordenes desde el rol admin
router.route('/admin/allOrders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders)

// Establecemos la ruta para actualizar una orden desde el rol admin
router.route('/admin/updateOrder/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)

// Establecemos la ruta para eliminar una orden desde el rol admin
router.route('/admin/deleteOrder/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

module.exports = router;