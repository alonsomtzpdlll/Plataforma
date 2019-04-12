const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/userProf');
const Alumno = require('../models/userAlum');
//alumno!!!!!!!!!!!!!!!!!!!!!!!!1
//en este metodo tomamos a un usurioa y retornamos un collback
passport.serializeUser((Alum, done)=>{
    done(null, Alum.id);
})

//caso igual pero cotrario amiko :V
passport.deserializeUser((id, done) => {
    Alumno.findById(id, (err, Alum) => {
        done(err, Alum);
  })
})


 passport.use('alumno', new LocalStrategy({
    usernameField: 'matricula'
}, async (matricula, password, done) => {
    //crea el match con email del usuario
    const Alum = await Alumno.findOne({matricula: matricula});
    if(!Alum){ 
        return done(null, false, {message: 'Usuario no registrado'}); //no encontramos sus datos :v
    } else{
       const match1 = await Alum.matchPassword(password);
        if(!match1){
            console.log(match1);

            return done(null, false,{message: 'Contraseña incorrecta'});
        } else{
            console.log(match1);
            console.log(Alum);
            return done (null, Alum); //signginifcca que encobtramos correo y contraseña El usuario existe
            
        }
    }
}));
module.exports.Alumno;

module.exports = passport; 