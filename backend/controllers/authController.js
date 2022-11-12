const User = require("../models/auth");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary');

// Metodo para registrar un nuevo usuario --> [POST] /api/usuario/registro
exports.registroUsuario= catchAsyncErrors(async (req, res, next) =>{
    
    // Se definen los datos del nombre, email y password en el body de req
    const { nombre, email, password } = req.body;
    
    // Resultado de la promesa de Cloudinary al usar su uploader en v2
    const result = await cloudinary.v2.uploader.upload( req.body.avatar, {
        folder: 'avatars',
        width: 240,
        crop: 'scale'
    })


    // Se solicita creacion de usuario con los datos anteriores y se pasa un avatar cargado a traves del Uploader
    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    // Se crea el token al crear el usuario
    tokenEnviado(user,201,res);
})

//Metodo para iniciar sesion --> [GET] /api/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    
    // Se definen los datos del email y password en el body de req
    const {email, password} = req.body;

    // Revisar si se diligencian los datos completos
    if (!email || !password){
        return next(new ErrorHandler("Por favor ingrese email y contraseña", 400))
    }

    // Revisar si el usuario esta registrado en la base de datos
    const user = await User.findOne({email}).select("+password")

    // Si no se encuentra un usuario con el email indicado, se pasa mensaje de error
    if (!user){
        return next(new ErrorHandler('Email invalido', 401))
    }

    // Si encuentra usuario con email indicado se comparan contraseñas para verificar si es correcta
    const passOk = await user.comparePassword(password);

    // Se la contraseña no es correcta
    if (!passOk){
        return next(new ErrorHandler("Contraseña invalida", 401))      
    }

    // Si todo esta correcto, se crea el token al iniciar sesion
    tokenEnviado(user, 201, res);
    
})

// Metodo para cerrar sesion --> [GET] /api/logout
exports.logoutUser = catchAsyncErrors(async(req, res, next) => {
    
    // Se elimina la cookie guardada y se expira inmediatamente por seguridad adicional
    res.cookie('token', null, {
        expires: new Date(Date.now()), 
        httpOnly: true
    });

    // Se envia la respuesta al servidor
    res.status(200).json({
        success: true,
        message: "Se cerró la sesion exitosamente!"
    })

})

// Metodo para recuperar contraseña olivdada a traves de "Recuperar contraseña" --> [POST] /api/forgotPassword
exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {
    
    // Busca un usuario en la base de datos con el email extraido del body del req
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
        
        // Se envia la respuesta al servidor
        res.status(200).json({
            success: true,
            message: `Correo de recuperacion de contraseña enviado a: ${user.email}`
        })
    
    // Si se da un error al enviar el email...
    } catch(error){
        
        // Se borra la info del token de reset del pass
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // Se guarda la info anterior
        await user.save({validateBeforeSave:false});
        
        // Se envia un mensaje de error
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

    // Si el usuario no esta en la base de datos...
    if(!user){
        return next(new ErrorHandler("El token es invalido o ya expiró", 400))
    }
    
    // Si las contraseñas ingresadas en el body no coinciden (password y confirmPassword)
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Contraseñas no coinciden", 400))
    }

    // Si todo esta bien, establecemos la nueva contraseña y borramos la info del roken de reset del pass
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    // Guardamos los datos del usuario con validacion
    await user.save();

    // Se crea el token al resetear el password
    tokenEnviado(user, 200, res)
})

// Metodo para ver perfil de usuario --> [GET] /api/myAccount
exports.getUserProfile = catchAsyncErrors ( async (req, res, next) => {
    
    // Se busca un usuario segun el id pasado desde la cookie
    const user = await User.findById(req.user.id);

    // Se envia la respuesta al servidor
    res.status(200).json({
        success: true,
        user
    })
})

// Metodo para actualizar contraseña de usuario logueado --> [PUT] /api/myAccount/updatePassword
exports.updatePassword = catchAsyncErrors ( async (req, res, next) => {
    
    // Extraemos adicionalemnte la info del usuario y el password desde los datos del usuario 
    // a traves del ID que viene en la cookie
    const user = await User.findById(req.user.id).select("+password")

    // Se pasa a traves del req el oldPassword para verificar la contraseña actual...
    // TODO: Ingresar campo en el front llamada oldPassword
    const passIguales = await user.comparePassword(req.body.oldPassword)

    // Si la contraseña actual (oldPassword) ingresada es incorrecta...
    if(!passIguales){
        return next(new ErrorHandler('La contraseña actual no es correcta!', 401))
    }

    // Se pasa a traves del req el newPassword del usuario...
    //TODO: Agregar en el front un campo llamado newPassword
    user.password = req.body.newPassword;
    
    // Guardamos los cambios de contraseña...
    await user.save()

    // Se crea el token al actualizar la contraseña
    tokenEnviado(user, 200, res)

})

// Metodo para actualizar el perfil de un usuario logueado --> [PUT] /api/myAccount/updateProfile
exports.updateProfile = catchAsyncErrors( async (req,res,next) => {
    
    // Se solicitan los datos a actualizar desde el body del req. Los campos son a consideracion
    // del coder... En este caso es nombre y email
    const newUserData ={
        nombre: req.body.nombre,
        email: req.body.email
        // Ejemplo para cambiar campo llamado address con el campo direccion del body
        // address: req.body.direccion
        // Ejemplo para cambiar campo llamado phone con el campo telefono del body
        // phone: req.body.telefono
        // NOTA: Los campos address y phone deben existir en el modelo del usuario (auth)
    }

    //TODO: update de Avatar: pendiente

    // Se busca un usuario con el ID pasado con la cookie y se actualiza con la info anterior
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        user
    })
})

// Servicios controladores sobre usuarios por parte de los ADMIN

// Metodo de ADMIN para ver todos los usuarios --> [GET] /api/admin/allUsers
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{
    
    // Se buscan todos los usuarios de la base de datos
    const users = await User.find();

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        users
    })
})

// Metodo de ADMIN para ver el detalle de un usuario identificado por un id --> [GET] /admin/user/:id
exports.getUserDetails= catchAsyncErrors( async(req, res, next) => {
    
    // Se recibe el id del usuario a traves de un parametro de la Url
    const user= await User.findById(req.params.id);

    // Si no se encuentra ningun usuario con el ID indicado...
    if (!user){
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    // Se envia la respuesta al servidor
    res.status(200).json({
        success: true,
        user
    })
})

// Metodo de ADMIN para actualizar perfil de usuario --> [PUT] /api/admin/updateUser/:id
exports.updateUser= catchAsyncErrors ( async (req, res, next) => {
    
    // Se pasa por el body del req los datos del nombre, email y rol
    // NOTA: Los campos nombre, email y role hacen parte del modelo de usuario (auth)
    const newUserData = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    // Se envia la solicitud para actualizar con los datos ingresados anteriormente, solo actualiza los datos
    // nuevos y se valida que esten bn estructurados
    const user= await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        user
    })
})

// Metodo de ADMIN para eliminar un usuario --> [DELETE] /api/admin/deleteUser/:id
exports.deleteUser = catchAsyncErrors ( async (req, res, next) => {
    
    // Se recibe el id del usuario a traves de un parametro de la Url
    const user = await User.findById(req.params.id);

    // Si no encuentra un usuario con el ID indicado...
    if(!user){
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en nuestra base de datos`))
    }

    // Si encuentra el usuario lo elimina de la base de datos
    await user.remove();

    // Se envia la respuesta al servidor
    res.status(200).json({
        success:true,
        message:"Usuario eliminado correctamente"
    })
})