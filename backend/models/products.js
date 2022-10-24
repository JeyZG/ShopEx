const mongoose = require('mongoose');

function HoursToDate(objDate, intHours) {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intHours * 60) * 60000;
    var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
 
    return newDateObj;
}

const productsSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "Por favor ingrese el nombre del producto."],
        trim: true,
        maxLength:[120, "El nombre del producto no debe exceder los 120 caracteres."]
    },
    marca:{
        type: String,
        required: [true, "Por favor ingrese la marca del producto."],
        trim: true,
        maxLength:[30, "La marca del producto no debe exceder los 30 caracteres."]
    },
    precio:{
        type: Number,
        required: [true, "Por favor registre el precio del producto."],
        maxLength:[8, "El precio del producto no puede ser mayor a 99'999.999"],
        default: 0.0
    },
    descripcion:{
        type: String,
        required: [true, "Por favor ingrese la descripcion del producto."],
    },
    calificacion:{
        type: Number,
        default: 0
    },
    imagen:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    categoria:{
        type: String,
        required: [true, "Por favor seleccione la categoria del producto."],
        enum:{
            values:[
                "Accesorios",
                "Audio y video",
                "Cables y cargadores",
                "Celulares y tablets",
                "Computadores",
                "Zona gamer"
            ]
        }
    },
    vendedor:{
        type: String,
        required: [true, "Por favor registre el vendedor del producto."]
    },
    inventario:{
        type: Number,
        required: [true, "Por favor registre el stock del producto"],
        maxLength: [5, "Cantidad maxima del producto no puede sobrepasar 99.999"],
        default: 0
    },
    numCalificaciones:{
        type: Number,
        default: 0
    },
    opiniones:[
        {
            nombreCliente:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comentario:{
                type: String,
                required: true
            }
        }
    ],
    fechaCreacion:{
        type: Date,
        required: true,
        default: Date.now
        //default: HoursToDate(Date.now, 5)
    }
});

module.exports = mongoose.model("productos",productsSchema);