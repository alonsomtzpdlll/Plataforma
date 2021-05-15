//urls de pregutas, pa' crear y ver etc


const rutas = require('express').Router(); //permite tener objeto de creacion de rutas

const {
    isAuthenticated
} = require('../helpers/hola');
const passport = require('passport');
const preguntas = require('../models/Pregun');
const calificacion1 = require('../models/calificacion');

rutas.get('/user/alum/exam', isAuthenticated, async (req, res) => { //tenemos request y response :C y solo mandaremos mensaje index
    
    console.log(req.user.carrera);
    var Preg = await preguntas.find({
        carrera: req.user.carrera
    });

    res.render('questions/examen', {Preg});

    var preguntas_total= Preg.length;
    var aciertos = 0;
    var prom= 0;

rutas.post('/user/examen/derecho88',isAuthenticated, async (req, res) => {
       
    console.log("inicio del post que manda la respuesta"); //! desde aqi es cuando ya no entra

    const hola = { Pregunta, newradio1, newradio2, newradio3, newradio4 } = req.body
    const preg = await preguntas.findOne({ pregunta: Pregunta });
    
    console.log(preguntas_total);
    
    console.log("declaro las variables de para la calificacion "); //! aqui menos llega 

    if (preg.radio1 == newradio1 && preg.radio2 == newradio2 && preg.radio3 == newradio3 && preg.radio4 == newradio4) {
        console.log('tiene un punto');
        aciertos++ ; 
        
    }
    else {
        console.log('no amiwo suerte pa la prox');
        console.log(hola);
        
        //res.redirect('/user/menu/alumnoDerecho8');
    }
    console.log(preg.radio1);
    console.log(newradio1);
    console.log(preg.radio2);
    console.log(newradio2);
    console.log(preg.radio3);
    console.log(newradio3);
    console.log(preg.radio4);
    console.log(newradio4);
    console.log(aciertos);
    
    console.log('termino proceso');
    
    rutas.get('/menu/resultados', async (req,res)=>{
        console.log('numero de preguntas ', preguntas_total);
        
        console.log('aciertos ',aciertos);
        var prom = (aciertos/preguntas_total)*10;
        console.log('promedio ',prom);
        console.log(' req punto Alum',req.user.name);
        
        newcalificacion = new calificacion1({
            aciertos,preguntas_total,prom });
            
        newcalificacion.Alum = req.user.id; 
        console.log(newcalificacion);
        await newcalificacion.save();
        const calif = await calificacion1.find({ Alum: req.user.id }).sort({ date: 'desc' }); //aqui le pido que solo quiero los examenes con las que el usuario se ha autenticado
            console.log('aqui van lo que mando al hbs ', calif);
            
        res.redirect('/menu/alumno');
    });
});
});

//RECIBIR DATOS DEL NUEVO EXAMEN
rutas.post('/new', isAuthenticated, async (req, res) => { //ponemos async para que no se quede en el proceso
    const {
        carrera,
        materia,
        Pregunta,
        Respuesta1,
        Respuesta2,
        Respuesta3,
        Respuesta4,
        radio1,
        radio2,
        radio3,
        radio4
    } = req.body; //destruye las cosas que pedimos por HTML
    const error = [];
    if (!carrera) {
        error.push({
            text: 'Por favor ingrese la Carrea'
        });
    }
    if (!materia) {
        error.push({
            text: 'Por favor ingrese la Materia'
        });
    }
    if (!Pregunta) {
        error.push({
            text: 'Por favor ingrese una Pregunta'
        });
    }
    if (!Respuesta1) {
        error.push({
            text: 'Por favor ingrese la Respuesta 1'
        });
    }
    if (!Respuesta2) {
        error.push({
            text: 'Por favor ingrese la Respuesta 2'
        });
    }
    if (!Respuesta3) {
        error.push({
            text: 'Por favor ingrese la Respuesta 3'
        });
    }
    if (!Respuesta4) {
        error.push({
            text: 'Por favor ingrese la Respuesta 4'
        });
    }
    /*if (!radio1 || radio2 || radio3 || radio4) {
        error.push({text: 'Por favor ponga una respuesta'});
    }*/
    console.log(error);

    if (error.length > 0) {
        res.render('questions/new-Q', {
            error,
            Pregunta,
            Respuesta1,
            Respuesta2,
            Respuesta3,
            Respuesta4,
            radio1,
            radio2,
            radio3,
            radio4,
            materia,
            carrera
        });
    } else {
        const newPreg = new preguntas({
            Pregunta,
            Respuesta1,
            Respuesta2,
            Respuesta3,
            Respuesta4,
            radio1,
            radio2,
            radio3,
            radio4,
            materia,
            carrera
        }); //instanciamos la nota+
        newPreg.user = req.user.id; //pra vincular preguntas a una sola cuenta
        console.log(newPreg);
        await newPreg.save(); //guardando la nota y await para saber que es un proceso async
        req.flash('success_msg', 'Exámen hecho satisfactoriamente'); //mandar mensajes
        res.redirect('/new');

    }


});
//buscar in the database :V y recorrer
rutas.get('/new', isAuthenticated, async (req, res) => {
    const Preg = await preguntas.find({
        user: req.user.id
    }).sort({
        date: 'desc'
    }); //aqui le pido que solo quiero los examenes con las que el usuario se ha autenticado
    res.render('questions/todas-preguntas', {
        Preg
    });
});

/*
rutas.get('/menu/alumno', async (req, res) => {
    
    await userAlum.findOne(req.Alum.id, (err,Alumno)=>{
        if(err){
            console.log(err);
    res.render('users/alumno');
        }else{
            console.log(Alumno);
    res.render('users/alumno');
        }
    });
    
});*/



//kno aqui es :v 



//editar compa :)
rutas.get('/exam/edit/:id', isAuthenticated, async (req, res) => {
    let {
        id
    } = req.user;
    const exam = await preguntas.findById(id);
    console.log(exam);
    res.render('questions/exam-edit', {
        exam
    });
});


//actualizar mediante method PUT
rutas.put('/exam/examen-edit/:id', isAuthenticated, async (req, res) => {
    const {
        Pregunta,
        Respuesta1,
        Respuesta2,
        Respuesta3,
        Respuesta4,
        radio1,
        radio2,
        radio3,
        radio4,
        materia,
        carrera
    } = req.body;
    let {
        id
    } = req.params;
    await preguntas.findByIdAndUpdate(id, {
        Pregunta,
        Respuesta1,
        Respuesta2,
        Respuesta3,
        Respuesta4,
        radio1,
        radio2,
        radio3,
        radio4,
        materia,
        carrera
    });
    req.flash('success_msg', 'Exámen actualizado satisfactoriamente'); //mandar mensaje :v
    res.redirect('/new');
});

rutas.delete('/exam/delete/:id', isAuthenticated, async (req, res) => {
    let {
        id
    } = req.params;
    await preguntas.findOne({
        _id: id
    }).remove();
    req.flash('success_msg', 'Exámen eliminado satisfactoriamente'); //mandar mensaje 
    res.redirect('/new');
});
module.exports = rutas;

/**
 * ! Aqui se haran todos los examenes alv compa PPCDSALVC
 *

    rutas.get('/exam/examenUnico/:id', simon, async (req,res)=> {
    const {examSis} = userAlum.find({carrera : })
    })
    */
