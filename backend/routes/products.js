const express = require('express');
const router = express.Router();

const { getProducts } = require('../controllers/productsController');

// Ruta para ver la lista de todos los productos
router.route('/productos').get(getProducts);

module.exports = router;