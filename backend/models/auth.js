const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [120, "Nombre no puede exceder los 120 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    password: {
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minlength: [8, "Tu contraseña no puede tener menos de 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encriptamos la contraseña antes de guardarla
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Decodificamos la contraseña y comparamos
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Retornamos un token JWT
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

// Generar un token para reset de contraseña
userSchema.methods.genResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash y setear reserToken (opcional)
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Establecer fecha de expiracion del token a 30 minutos
    this.resetPasswordExpire = Date.now() + 30*60*100

    return resetToken;
}

module.exports = mongoose.model("auth", userSchema)