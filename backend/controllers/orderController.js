const Order = require('../models/order')
const Product = require('../models/products')
const catchAsyncErrors= require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler")

// Metodo para crear una nueva orden --> [POST] /api/order/newOrder
exports.newOrder= catchAsyncErrors (async (req, res, next)=>{
    
    // Se extrae la info de los campos desde el body del req
    const {
        Items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo
    } = req.body;

    // Se solicita crear una nueva orden con los datos anteriores
    const order= await Order.create({
        Items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo,
        fechaPago: Date.now(),
        user: req.user._id
    })

    // Se envia la respuesta al servidor
    res.status(201).json({
        success:true,
        order
    })
})

// Metodo para ver una orden perteneciente al usuario logueado --> [GET] /api/order/:id
exports.getOneOrder= catchAsyncErrors( async(req, res, next) => {
    
    // Se solicita buscar una orden segun su ID mientras que el usuario y el email del ID logueado sea igual
    const order= await Order.findById(req.params.id).populate("user", "nombre email") //restriccion de usuario

    // Si no encuentra una orden...
    if(!order){
        return next(new ErrorHandler("No encontramos una orden con ese Id", 404))
    }

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        order
    })
})

// Metodo para ver todas las ordenes de un usuario logueado --> [GET] /api/order
exports.myOrders= catchAsyncErrors( async(req,res, next) => {
    
    // Solicitar buscar una orden segun el id de un usuario
    const orders= await Order.find({user: req.user._id});

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        orders
    })
})

// Servicios controladores sobre ordenes por parte de los ADMIN

// Metodo de ADMIN para ver todas la ordenes --> [] /api/admin/allOrders
exports.allOrders= catchAsyncErrors( async (req, res, next) => {
    
    // Se solicitan todas las ordenes de la base de datos
    const orders = await Order.find()

    // Se establece una variable para la cantidad total
    let cantidadTotal= 0;
    // Hacemos un acumulador del valor de las ordenes en la base de datos
    orders.forEach(order =>{
        // cantidadTotal= cantidadTotal + order.precioTotal
        cantidadTotal += order.precioTotal
    })

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        cantidadTotal,
        orders
    })

})

// Metodo de ADMIN para editar una orden segun su id --> [PUT] /api/admin/updateOrder/:id
exports.updateOrder = catchAsyncErrors( async (req, res, next) => {
    
    // Se solicita una orden identificada con un id que viene como parametro en la Url
    const order = await Order.findById(req.params.id)

    // Si no encuentra una orden...
    if(!order){
        return next (new ErrorHandler("Orden no encontrada", 404))
    }

    // Si el estado de la orden es Enviado, ya no se podrá modificar
    if (order.estado==="Enviado"){
        return next(new ErrorHandler("Esta orden ya fue enviada", 400))
    }
    
    // Actualizamos los campos como estado y fechaEnvio que lo pasamos en el body del req
    // Si se quieren cambiar mas campos, se debe incluir en el body del req
    order.estado = req.body.estado;
    order.fechaEnvio= Date.now();

    // Actualizamos la info modificada en la base de datos
    await order.save()

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        order
    })
})

// Funcion para actualizar el stock del inventario
async function updateStock(id, quantity){
    
    // Se solicita un producto segun su id
    const product = await Product.findById(id);
    
    // Se le resta al inventario la cantidad establecida y se guarda su valor en la base de datos
    product.inventario= product.inventario-quantity;
    await product.save({validateBeforeSave: false})
}

// Metodo de ADMIN para eliminar una orden --> [DELETE] /api/admin/deleteOrder/:id
exports.deleteOrder = catchAsyncErrors( async (req, res, next) => {
    
    // Se solicita buscar una orden segun el id que se pasa por la Url
    const order = await Order.findById(req.params.id);

    // Si no encuentra la orden...
    if(!order){
        return next (new ErrorHandler("Esa orden no esta registrada", 404))
    }

    // Si encuentra la orden, la elimina de la base de datos
    await order.remove()

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        message:"Orden eliminada correctamente"
    })
})