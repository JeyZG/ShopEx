const express = require('express');
const router = express.Router();

// Traemos la respuesta JSON desde el controlador
const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require('../controllers/productsController');
// Nos traemos los metodos usados en el MiddleWare
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Establecemos la ruta para ver los productos ver el getProducts
router.route('/productos').get(getProducts);

// Establecemos la ruta para ver un producto segun su Id
router.route('/producto/:id').get(getProductById);

// Establecemos la ruta donde se va a generar el nuevo producto
router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// Establecemos la ruta donde se va a actualizar un producto segun su Id
router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// Establecemos la ruta donde se va a eliminar un producto segun su Id
router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;