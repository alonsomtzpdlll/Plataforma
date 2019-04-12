const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/userAlum');


//en este metodo tomamos a un usurioa y retornamos un collback
passport.serializeUser((user, done)=>{
    done(null, user.id);
})

//caso igual pero cotrario amiko :V
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

//vamos a definir el metodo para comprobar si el usuario existe
passport.use( 'cosa', new LocalStrategy({
    usernameField: 'matricula'
}, async (matricula, password, done) => {
    //crea el match con email del usuario
    const user = await User.findOne({matricula: matricula});
    if(!user){
        return done(null, false, {message: 'Usuario no registrado'}); //no encontramos sus datos :v
    } else{
       const match = await user.matchPassword(password);
        if(match){
            console.log(match);
            return done (null, user); //signginifcca que encobtramos correo y contraseña El usuario existe
        } else{
            console.log(match);
            return done(null, false,{message: 'Contraseña incorrecta'});
        }
    }
}));


module.exports = passport; 