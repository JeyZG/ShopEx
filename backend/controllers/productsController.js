const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/products");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({default:fetch}) => fetch(url)); // Importacion de fetch para usar con NodeJS

// Ver la lista de productos --> [GET] /api/productos
exports.getProducts = catchAsyncErrors( async(req,res,next) => {
    
    // Establecemos cuantos productos quiero por paginas
    const resPerPage = 3 // Solo por ejemplo
    // Establecemos la cantidad de productos existentes
    const productsCount = await producto.countDocuments();

    // Se establece la variable para el filtro de paginas
    const apiFeatures = new APIFeatures(producto.find(), req.query)
        .search()
        .filter();
    
    let products = await apiFeatures.query;
    let filteredProductCount = products.length;
    
    apiFeatures.pagination(resPerPage)
    
    // Se aplica la paginacion con una clonacion de la consulta anterior
    products = await apiFeatures.query.clone();

    

    // Se envia la respuesta la servidor
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductCount,
        products
    })

    // Se solicita la busqueda de todos los productos de la base de datos
    const productos = await producto.find();
    
    // Si no encuentra productos genera un mensaje de error
    if(!productos){
        return next(new ErrorHandler("No se encontro informacion de los productos", 404))
    }
    
    // Se envia la respuesta al servidor
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

// Metodo para eliminar un producto --> [DELETE] /api/producto/id
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

// Metodo para crear un review de un producto --> [PUT] /api/producto/review/new
exports.createProductReview = catchAsyncErrors ( async (req, res, next) => {
    // Se va a pasar la informacion a traves del body del req
    const { rating, comentario, idProducto } = req.body;

    // Se arma un Json para llenar la informacion del review
    const opinion = {
        nombreCliente: req.user.nombre,
        rating: Number(rating),
        comentario
    }

    // Se solicita buscar un producto en la base de datos segun el ID
    const product = await producto.findById(idProducto);

    // Se verifica si se ha hecho algun review desde el perfil del usuario logueado.
    // Si la encuentra solo permite actualizarlo
    const isReviewed = product.opiniones.find(item => 
        item.nombreCliente === req.user.nombre)

    // Actualizar un review anterior
    if (isReviewed){
        product.opiniones.forEach(opinion => {
            if(opinion.nombreCliente === req.user.nombre){
                opinion.comentario = comentario,
                opinion.rating = rating
            }
        })
    // Guardar un review nuevo
    }else{
        product.opiniones.push(opinion)
        product.numCalificaciones = product.opiniones.length
    }

    // Calcular el promedio para ver la calificacion del producto
    product.calificacion = product.opiniones.reduce ((acc, opinion) => 
    opinion.rating + acc, 0) / product.opiniones.length

    // Se guarda la info en la base de datos
    await product.save({validateBeforeSave:false});

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        message:"Has dejado una opinion correctamente!"
    })
})

// Metodo para ver los reviews de un producto segun el ID --> [GET] /api/producto/review/get
exports.getProductReviews = catchAsyncErrors( async (req, res, next) => {

    // Extraemos un producto pasando el id desde query del req
    const product = await producto.findById(req.query.id)

    res.status(200).json({
        success: true,
        opiniones: product.opiniones
    })
})

// Metodo para eliminar un review segun su id --> [DELETE] /api/producto/review/delete
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {

    // Extraemos un producto pasando el id desde query del req
    const product = await producto.findById(req.query.idProducto)

    // Hacemos un filtro donde vamos a cargar todas las opiniones menos la que vamos a eliminar
    const opiniones = product.opiniones.filter( opinion => 
        
        // Cargamos todas las reviews excepto la que vamos a eliminar, pasamos su ID en el query del req 
        opinion._id.toString() !== req.query.idReview.toString());

    // Recalculamos el numero de calificaciones
    const numCalificaciones =  opiniones.length;

    // TODO: Verificar que la calificacion del producto si quede correctamente despues de eliminar review
    // Recalculamos las calificaciones del producto
    const calificacion = product.opiniones.reduce((acc, Opinion) => 
    Opinion.rating + acc, 0)/opiniones.length
    
    // Actualizamos lo pertinente a reviews y calificaciones
    await producto.findByIdAndUpdate(req.query.idProducto, {

        opiniones,
        calificacion,
        numCalificaciones
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    // Se envia la respuesta al servidor
    res.status(200).json({
        success: true,
        message: "Review eliminada correctamente!"
    })
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