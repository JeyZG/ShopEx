const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Verificamos si estamos autenticados (Existencia y veracidad del token)
exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies

    if (!token){
        return next(new ErrorHandler('Debe iniciar sesión para acceder a este recurso', 401))
    }
    else{

        // Decodifica el token guardado en la cookie y extrae el ID, proceso inverso a lo realizado en el modelo auth
        const decodificada = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodificada.id);
        next();
    }
        
})

// Capturamos el rol del usuario logueado
exports.authorizeRoles = (...roles) => {
    return (req,res, next) => {
        if(!roles.includes(req.user.role)){
            return next( new ErrorHandler(`Rol (${req.user.role}) no esta autorizado a entrar a esta area`, 403));
        }
        next();
    }
}