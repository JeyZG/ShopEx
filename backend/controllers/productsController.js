const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/products");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({default:fetch}) => fetch(url)); // Importacion de fetch para usar con NodeJS

// Ver la lista de productos --> [GET] /api/productos
exports.getProducts = catchAsyncErrors( async(req,res,next) => {
    const productos = await producto.find();
    
    if(!productos){
        return res.status(404).json({
            success: false,
            error: true
        });
    }
    
    res.status(200).json({
        success: true,
        count: productos.length,
        productos
    });
})

// Ver un producto segun su ID --> [GET] /api/producto/id
exports.getProductById = catchAsyncErrors( async(req,res,next) => {
    const product = await producto.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Producto no encontrado', 404))
    }
    
    res.status(200).json({
        success: true,
        message: "A continuacion la info del producto:",
        product
    });
})

// Crear nuevo producto --> [POST] /api/productos
exports.newProduct = catchAsyncErrors(async(req,res,next) => {
    
    // Se extrae el id de la cookie y se guarda en el objeto tipo user
    req.body.user = req.user.id

    // Se genera la creacion del producto con el metodo de Mongoose
    const product = await producto.create(req.body);
    
    // Se muestra la info en formato json en el response
    res.status(201).json({
        success:true,
        product
    })
})

// Actualizar un producto --> [PUT] /api/producto/id
exports.updateProduct = catchAsyncErrors( async(req,res,next) => {
    let product = await producto.findById(req.params.id);

    // Si es objeto no existe, retorna un mensaje y finaliza el proceso...
    if(!product){
        return res.status(404).json({
            success:false,
            message: "Producto no encontrado",
            error:true
        });
    }
    
    // Si el objeto si existe, toma la info del body y actualiza solo los atributos que se envian en el body
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Valida solo los atributos nuevos
        runValidators: true
    });

    // Envia la respuesta despues de actualizar la info del producto
    res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente!",
        product
    });
})

// Eliminar un producto --> [DELETE] /api/producto/id
exports.deleteProduct = catchAsyncErrors( async(req,res,next) => {
    const product = await producto.findById(req.params.id);

    // Si es objeto no existe, retorna un mensaje y finaliza el proceso...
    if(!product){
        return res.status(404).json({
            success:false,
            message: "Producto no encontrado"
        });
    }
    
    await product.remove();

    res.status(200).json({
        success:true,
        message: "Producto eliminado correctamente."
    });
    
})

// ************************* USO DE FETCH *************************

// Ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

// llamado del metodo creado con fetch para ver todos los productos
// verProductos(); 

// Ver un producto por Id
function verProductosPorId(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

// llamado del metodo creado con fetch para ver un producto por Id
// verProductosPorId('6351add8c67e055b6702d067'); 

// ****************************************************************