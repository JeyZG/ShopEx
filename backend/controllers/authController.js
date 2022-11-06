const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")

// Metodo para registrar un nuevo usuario --> [POST] /api/usuario/registro
exports.registroUsuario= catchAsyncErrors(async (req, res, next) =>{
    const {nombre, email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id:"ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })

    tokenEnviado(user,201,res);
})

//Metodo para iniciar sesion --> [GET] /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    // Revisar si se diligencian los datos completos
    if (!email || !password){
        return next(new ErrorHandler("Por favor ingrese email y contraseña", 400))
    }

    // Revisar si el usuario esta registrado en la base de datos
    const user = await User.findOne({email}).select("+password")

    if (!user){
        return next(new ErrorHandler('Email invalido', 401))
    }

    // Comparar contraseñas para verificar si es correcta
    const passOk = await user.comparePassword(password);

    if (!passOk){
        return next(new ErrorHandler("Contraseña invalida", 401))      
    }

    tokenEnviado(user,201,res);
    
})

// Metodo para cerrar sesion --> [GET] /api/logout
exports.logoutUser = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()), 
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Se cerró la sesion exitosamente!"
    })

})

// Metodo para recuperar contraseña olivdada a traves de "Recuperar contraseña" --> [POST] /api/forgotPassword
exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {
    
    // Busca un usuario en la base de datos con el email
    const user = await User.findOne({email: req.body.email});

    // Si no encuentra el usuario...
    if (!user){
        return next(new ErrorHandler("Usuario no se encuentra registrado", 404));
    }

    // Guardar el token generado para reset del pass
    const resetToken = user.genResetPasswordToken();

    // Actualiza la info del usuario con el token de reset pass sin validar el resto de informacion
    await user.save({validateBeforeSave: false});

    // Creamos una URL para hacer el reset de la contraseña, la cual se enviara por email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;

    // Definimos el cuerpo del email
    const mensaje = `Saludos!\n\n\tHemos recibido una solicitud de restablecimiento de contraseña.\n\n
    \tPuedes acceder a cambiarla haciendo clic en el siguiente enlace:\n\n
    \t\t${resetUrl}\n\n\n
    \tSi no fuiste tu quien lo solicitó, por favor comunicate con soporte (soporte@shopex.com).\n\n
    \tAtentamente,\n\n
    \tShopEx`
    
    // Envio de email para restablecer contraseña
    try{
        await sendEmail({
            email: user.email,
            subject: "ShopEx | Recuperacion de contraseña",
            mensaje
        })
        
        res.status(200).json({
            success: true,
            message: `Correo de recuperacion de contraseña enviado a: ${user.email}`
        })
    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
})

// Metodo para resetear la contraseña --> [POST] /api/resetPassword/:token
exports.resetPassword = catchAsyncErrors(async (req,res,next) =>{
    
    // Hash el token que llego con la Url
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest('hex')
    
    // Buscamos al usuario al que le vamos a resetear la contraseña
    const user= await User.findOne({
        resetPasswordToken,
        // Verificamos que la fecha de expiracion del token sea mayor al momento actual
        resetPasswordExpire:{$gt: Date.now()}
    })

    // El usuario si esta en la base de datos?
    if(!user){
        return next(new ErrorHandler("El token es invalido o ya expiró", 400))
    }
    
    // Diligenciamos bien los campos?
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Contraseñas no coinciden", 400))
    }

    // Setear la nueva contraseña
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    // Guardamos los datos del usuario con validacion
    await user.save();

    // Se genera el nuevo token
    tokenEnviado(user, 200, res)
})

// Metodo para ver perfil de usuario --> [GET] /api/myAccount
exports.getUserProfile = catchAsyncErrors ( async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Metodo para actualizar contraseña de usuario logueado --> [PUT] /api/myAccount/updatePassword
exports.updatePassword = catchAsyncErrors ( async (req, res, next) => {
    
    // Extraemos adicionalemnte la contraseña desde los datos del usuario que vienen en el body
    const user = await User.findById(req.user.id).select("+password")

    // Revisamos si la contraseña actual es igual a la nueva
    // TODO: Ingresar campo en el front llamada oldPassword
    const passIguales = await user.comparePassword(req.body.oldPassword)

    if(!passIguales){
        return next(new ErrorHandler('La contraseña actual no es correcta!', 401))
    }

    //TODO: Agregar en el front un campo llamado newPassword
    user.password = req.body.newPassword;
    
    await user.save()

    tokenEnviado(user, 200, res)

})

// Metodo para actualizar el perfil de un usuario logueado --> [PUT] /api/
exports.updateProfile = catchAsyncErrors( async (req,res,next) => {
    
    // Actualizar el email por user a decision de cada uno
    const newUserData ={
        nombre: req.body.nombre,
        email: req.body.email
    }

    //TODO: update de Avatar: pendiente

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})

// Servicios controladores sobre usuarios por parte de los ADMIN

// Metodo de ADMIN para ver todos los usuarios --> [GET] /api/admin/
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// Metodo de ADMIN para ver el detalle de un usuario identificado por un id
exports.getUserDetails= catchAsyncErrors( async(req, res, next) => {
    
    // Se recibe el id del usuario a traves de un parametro de la Url
    const user= await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Metodo de ADMIN para actualizar perfil de usuario
exports.updateUser= catchAsyncErrors ( async (req, res, next) => {
    
    const newUserData={
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    const user= await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})

// Metodo de ADMIN para eliminar un usuario
exports.deleteUser= catchAsyncErrors ( async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en nuestra base de datos`))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"Usuario eliminado correctamente"
    })
})