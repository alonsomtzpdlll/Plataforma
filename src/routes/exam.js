const rutas = require('express').Router();

/*
const userAlum = require('../models/userAlum');

const preguntas = require('../models/Pregun');
const calificacion1 = require('../models/calificacion');



//aqui renderizamos todos los exámenes
rutas.post('/user/signinAlumnos', async (req, res) => {

    const { matricula, contraseña } = req.body;
    const Alum = await userAlum.find({ matricula: matricula });

    console.log(Alum); //cpmparamos que carrera es y le mandamos un menu dependiendo de eso

    if (Alum.carrera == 'Derecho 8vo') {
        var aciertos = null ;
        
        console.log("hola1"); //! aqui si entro

        res.redirect('/user/menu/alumnoDerecho8');
        rutas.get('/user/menu/alumnoDerecho8', async (req, res) => {
            res.render('menus/alumnoDer8', { Alum});
            const Preg = await preguntas.find({ carrera: "Derecho 8vo" }).sort({ date: 'desc' });
           // console.log(Preg)
            const preguntas_total = Preg.length;
            console.log("Hola fin preguntas"); //! aqui tambien entro 

            rutas.get('/user/examen/derecho8', (req, res) => {
                
                console.log(req);
                console.log("entra para renderizar el hbs de las preguntas"); //! aqui si entra

                res.render('examen/examenDer8', { Preg, Alum });
            });

            //?  esta es la parte donde ya no entra a leer el codigo, pero si pasa por aquí
            rutas.post('/user/examen/derecho8/:id', async (req, res) => {

                console.log("inicio del post que manda la respuesta"); //! desde aqi es cuando ya no entra

                const hola = { Pregunta, newradio1, newradio2, newradio3, newradio4 } = req.body
                const preg = await preguntas.findOne({ pregunta: Pregunta });
                
                
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
                console.log('termino proceso');
                
                
            });
            rutas.get('/menu/resultados', async (req,res)=>{
                console.log('numero de preguntas ', preguntas_total);
                
                console.log('aciertos ',aciertos);
                const prom = (aciertos/preguntas_total)*10;
                console.log('promedio ',prom);
                
                newcalificacion = new calificacion1({
                    aciertos,preguntas_total,prom });
                    const alum =  Alum._id;
                newcalificacion.Alum = alum; 
                console.log(newcalificacion);
                await newcalificacion.save();
                userAlum.calificacion = aciertos;
                const calif = await calificacion1.find({ Alum: alum }).sort({ date: 'desc' }); //aqui le pido que solo quiero los examenes con las que el usuario se ha autenticado
                    console.log('aqui van lo que mando al hbs ', calif);
                    
                res.render('menus/alumnoDer8', { calif,Alum });
            });
            
        });
    } else if (Alum.carrera == 'Derecho 5to') {

        console.log("hola3");
        res.redirect('/user/menu/alumnoDer5'); //redireccionalos y renderiza los examenes, (aun no pongo lso que me pasaste ayer)
        rutas.get('/user/menu/alumnoDer5', async (req, res) => {
            res.render('menus/alumnoDer5', { Alum });
            const Preg = await preguntas.find({ carrera: "Derecho 5to" });
            console.log(Preg)
            rutas.get('/user/examen/derecho5', (req, res) => {
                res.render('examen/examenDer5', { Preg, Alum });
            });
            
        });
        //res.send(Alum);
    } else if (Alum.carrera == 'Administración 5to') {
        const Preg = await preguntas.find({ carrera: 'Administración 5to' });
        res.redirect('/users/menu/alumnoAdm5');
        rutas.get('/users/menu/alumnoAdm5', (req, res) => {
            res.render('menus/alumnoAdm5', { Alum, Preg });

            rutas.get('/user/examen/adm5', (req, res) => {
                res.render('examen/examenAdm5', { Alum });
            });
        });
    } else if (Alum.carrera == 'Administración 8vo') {
        const Preg = await preguntas.find({ carrera: 'Administración 8vo' });
        res.redirect('menu/alumnoAdm8');
        rutas.get('menu/alumnoAdm8', (req, res) => {
            res.render('menus/alumnoAdm8', { Alum, Preg });

            rutas.get('/user/examen/adm8', (req, res) => {
                res.render('examen/examenAdm8', { Alum });
            });
        });
    } else if (Alum.carrera == 'Pedagogía 5to') {
        const Preg = await preguntas.find({ carrera: 'Pedagogía 5to' });
        res.redirect('menu/alumnoPed5');
        rutas.get('menu/alumnoPed5', (req, res) => {
            res.render('menus/alumnoPed5', { Alum });

            rutas.get('/user/examen/pedagogia5', (req, res) => {
                res.render('examen/examenPed5', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Pedagogía 8vo') {
        const Preg = await preguntas.find({ carrera: 'Pedagogía 8vo' });
        res.redirect('menu/alumnoPed8');
        rutas.get('menu/alumnoPed8', (req, res) => {
            res.render('menus/alumnoPed8', { Alum });

            rutas.get('/user/examen/pedagogia8', (req, res) => {
                res.render('examen/examenPed8', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Turismo 2do') {
        const Preg = await preguntas.find({ carrera: 'Turismo 2do' });
        res.redirect('menu/alumnoTur2');
        rutas.get('menu/alumnoTur2', (req, res) => {
            res.render('menus/alumnoTur2', { Alum });

            rutas.get('/user/examen/turismo2', (req, res) => {
                res.render('examen/examenTur2', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Turismo 5to') {
        const Preg = await preguntas.find({ carrera: 'Turismo 5to' });
        res.redirect('menu/alumnoTur5');
        rutas.get('menu/alumnoTur5', (req, res) => {
            res.render('menus/alumnoTur5', { Alum });

            rutas.get('/user/examen/turismo5', (req, res) => {
                res.render('examen/examenTur5', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Turismo 8vo') {
        const Preg = await preguntas.find({ carrera: 'Turismo 8vo' });
        res.redirect('menu/alumnoTur8');
        rutas.get('menu/alumnoTur8', (req, res) => {
            res.render('menus/alumnoTur8', { Alum });

            rutas.get('/user/examen/turismo8', (req, res) => {
                res.render('examen/examenTur8', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Ing. en Sistemas 2do') {
        const Preg = await preguntas.find({ carrera: 'Ing. en Sistemas 2do' });
        res.redirect('menu/alumnoIngSis2');
        rutas.get('menu/alumnoIngSis2', (req, res) => {
            res.render('menus/alumnoIngSis2', { Alum });

            rutas.get('/user/examen/ingSis2', (req, res) => {
                res.render('examen/examenIngSis2', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Contaduría 2do') {
        const Preg = await preguntas.find({ carrera: 'Contaduría 2do' });
        res.redirect('menu/alumnoCont2');
        rutas.get('menu/alumnoCon2', (req, res) => {
            res.render('menus/alumnoCont2', { Alum });

            rutas.get('/user/examen/Contaduria2', (req, res) => {
                res.render('examen/examenCon2', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Contaduría 5to') {
        const Preg = await preguntas.find({ carrera: 'Contaduría 5to' });
        res.redirect('menu/alumnoCont5');
        rutas.get('menu/alumnoCont5', (req, res) => {
            res.render('menus/alumnoCont5', { Alum });

            rutas.get('/user/examen/Contaduria5', (req, res) => {
                res.render('examen/examencon5', { Alum }, { Preg });
            });
        });
    } else if (Alum.carrera == 'Contaduría 8vo') {
        const Preg = await preguntas.find({ carrera: 'Contaduría 8vo' });
        res.redirect('menu/alumnoCont8');
        rutas.get('menu/alumnoCont8', (req, res) => {
            res.render('menus/alumnoCont8', { Alum });

            rutas.get('/user/examen/Contaduria8', (req, res) => {
                res.render('examen/examenCon8', { Alum }, { Preg });
            });
        });
    }
    else {
        res.send('hola');//cambiar esto
    }
});

/*/

module.exports = rutas;