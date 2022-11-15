const express = require('express');
const router = express.Router();

// Traemos la respuesta JSON desde el controlador
const { getProducts, 
        newProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct, 
        createProductReview, 
        getProductReviews, 
        deleteReview, 
        getAvaliableProducts } = require('../controllers/productsController');

// Nos traemos los metodos usados en el MiddleWare
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Establecemos la ruta para ver los productos ver el getProducts
router.route('/productos').get(getProducts);

// Establecemos la ruta para ver los productos con inventario disponible ver el getAvaliableProducts
router.route('/avaliableProducts').get(getAvaliableProducts);

// Establecemos la ruta para ver un producto segun su Id
router.route('/producto/:id').get(getProductById);

// Establecemos la ruta donde se va a generar el nuevo producto
router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// Establecemos la ruta donde se va a actualizar un producto segun su Id
router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// Establecemos la ruta donde se va a eliminar un producto segun su Id
router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// Establecemos la ruta donde un usuario autenticado va a dejar el review de un producto
router.route('/producto/review/new').put(isAuthenticatedUser, createProductReview);

// Establecemos la ruta donde se va a ver los reviews de un producto segun su id, sin estar autenticado
router.route('/producto/review/get').get(getProductReviews);

// Establecemos la ruta donde un usuario autenticado va a eliminar un review  de un producto segun su id
router.route('/producto/review/delete').get(isAuthenticatedUser, deleteReview);

module.exports = router;