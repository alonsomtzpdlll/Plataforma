const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


//Datos de usuarios de profesores
const profesoresSchema = new Schema({
    aciertos: { type: Number },
    preguntas_total: {type: Number},
    prom: {type: Number},
    Date: {type: Date, default: Date.now},
    Alum:{type:String,unique:true}
});

//encriptar contraseñas aca bien expert


module.exports = mongoose.model('calificacion', profesoresSchema);