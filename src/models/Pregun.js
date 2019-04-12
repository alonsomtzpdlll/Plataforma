const mongoose = require('mongoose');
const {Schema} = mongoose;

//una ves terminado el formualrio de preguntas llenar este krnal
const preguntasSchema = new Schema({
    carrera: { type: String, required :true},
    materia:{type:String, required: true },
    Pregunta: { type: String, required: true},
    Respuesta1: { type: String, required: true},
    radio1: { type: String, default: null},
    Respuesta2: { type: String, required: true},
    radio2: { type: String, default: null},
    Respuesta3: { type: String, required: true},
    radio3: { type: String, default: null},
    Respuesta4: { type: String, required: true},
    radio4: { type: String, default: null},
    Date: {type: Date, default: Date.now},
    user: {type: String},//creamos esto para vincular una cueta a su propio examen
    Alum:{type:String}
});
 

module.exports = mongoose.model('preguntas', preguntasSchema);