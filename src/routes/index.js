//url de pagian pricipal /abaoit/acerca de :V

const rutas = require('express').Router();//permite tener objeto de creacion de rutas
const useralum = require ('../models/userAlum');
const calificaciones = require ('../models/calificacion');
//tenemos request y response :C y solo mandaremos mensaje index
rutas.get('/', (req,res)=>{ 
    res.render('index');
});

rutas.get('/about', (req,res)=>{ 
    res.render('about');
});


//mostrar las calificaciones de sus alumnos
rutas.get('/profesor/calificaciones', async  (req,res)=>{ 

    
    const carr = req.user.carrera; //manda la carrera del profe donde imparte
    
    const Alumn = await useralum.find({carrera:carr}); //buscar a todos los alumnso inscritos ahi
    console.log(carr);
    console.log(Alumn);
    const califAlum= [];
    for(var i = 0; i<Alumn.length; i++){
     califAlum.push[0][i] = await calificaciones.findOne()
    }
    console.log(califAlum);

    

    res.render('questions/califProfe',{Alumn,califAlum});
});


module.exports = rutas;

