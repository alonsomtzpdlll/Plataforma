const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

//Datos de usuarios de alumnos
const alumnosSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    matricula: {type: String, required: true,unique:true, lowercase: true},
    password: { type: String, required: true},
    carrera:{type:String, required: true},
    Date: {type: Date, default: Date.now},
    Alum: {type: String},
    materia :{type: String}, 
    calificacion: {type: Number, unique: true}
    
});
//encriptar la contraseña amiwo
alumnosSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

//comparar contraseña del modelo de datos y del usuario
//sin funcion flecha :C
alumnosSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};


module.exports = mongoose.model('Alumnos', alumnosSchema);