const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


//Datos de usuarios de profesores
const profesoresSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    carrera: {type: String },
    matricula:{type: String},
    password: { type: String, required: true},
    Date: {type: Date, default: Date.now}
});

//encriptar contraseñas aca bien expert

profesoresSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

//comparar contraseña del modelo de datos y del usuario
//sin funcion flecha :C
profesoresSchema.methods.matchPassword = async function (password,cb) {
    return await bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('userProf', profesoresSchema);