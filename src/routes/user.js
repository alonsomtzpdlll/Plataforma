//url/ de autenticacion
const rutas = require('express').Router();//permite tener objeto de creacion de rutas
const passport = require('passport');
const userAlum= require('../models/userAlum');
const calificacion1 = require('../models/calificacion');

rutas.get('/user/signupAlumnos', (req,res)=>{ //signup para alumnos
    res.render('users/signupAlum');
});


rutas.get('/menu/alumno', async (req, res) => {
    const calif = await calificacion1.find({ Alum: req.user.id });
    
    
    res.render('users/alumno',{calif});
});

rutas.get('/user/signinAlumnos', (req,res)=>{ //tenemos request y response :C y solo mandaremos mensaje index
    res.render('users/signinAlum');//signup para Profesores
});


//autenticacion de alumnos 
rutas.post('/user/signinAlumnos', passport.authenticate('cosa',{
    
    successRedirect: '/menu/alumno',
    failureRedirect: '/user/signinAlumnos',
    failureFlash: true
}));


//esto es para creau un nuevo usuario de alumno
rutas.post('/user/signupAlumnos', async (req,res)=>{
    const {name, email,carrera,matricula, password, confirm_password } = req.body;
    const error= [];
    if(name<=0){
        error.push({text: 'Por favor ingrese un nombre'});
    }
    if(email<=0){
        error.push({text: 'Por favor ingrese un correo'});
    }
    if(carrera<=0){
        error.push({text: 'Por favor seleccione una carrera'});
    }
    if(matricula<=0){
        error.push({text: 'Por favor ingrese un nombre'});
    }
    if(password<=0){
        error.push({text: 'Por favor ingrese un nombre'});
    }
    
    if (password != confirm_password){
        error.push({text: 'Las contraseñas no coinciden.' });
    }
    if (password.length < 5){
        error.push({text: 'La contraseña debe contener al menos 5 caracteres.' });
    }
    if(error.length > 0){
        res.render('users/signupAlum', {error,name,matricula,carrera, email, password, confirm_password});

    } else{
        const emailAlum = await userAlum.findOne({email: email});
        const matriculaAlum = await userAlum.findOne({matricula: matricula});
        if(emailAlum){
            req.flash('error_msg', 'Este correo ya ha sido vinculado');
            res.redirect('/user/signupAlumnos');
        }
        if(matriculaAlum){
            req.flash('error_msg', 'Este correo ya ha sido vinculado');
            res.redirect('/user/signupAlumnos');
        }
        const newAlum = new userAlum({name,carrera,matricula, email,password}); //crear objeto de newprof
        newAlum.password = await newAlum.encryptPassword(password); //remplazar por contraseña cifrada
        await newAlum.save(); //guardar en base
        req.flash('success_msg', 'Has sido registrado');
        res.redirect('/user/signinAlumnos');
    }
});
//deslogearte :v
rutas.get('/users/logout', (req,res)=>{
    
    req.logout();
    res.redirect('/');
    console.log('se cerro la sesión');
});


module.exports = rutas;

