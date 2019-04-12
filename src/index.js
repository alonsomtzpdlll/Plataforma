const express = require('express');
const path = require('path'); //para directorios amiwito
const exphbs =require('express-handlebars');//motor de plantillas
const methodOverride = require('method-override');//metodos para formularios
const session =require('express-session');//inicios de sesion perro :V
const flash = require('connect-flash');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//inicio perro/////////////////////////////////////////////////////////////

const app = express();
require('./database')
require('./config/passport');

//////////////////////////////configuraciones amiwo/////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 8080);
app.set('views',path.join(__dirname,'views')); //direccionando los views
/////////////preparamos nuestro motor de plantillas con estencion .hbs
app.engine('.hbs',exphbs({
    defaultLayout:'main', //nombre del archivo que debe de buscar
    layoutsDir: path.join(app.get('views'), 'layouts'), // direccion de nuestros layouts
    partialsDir:  path.join(app.get('views'), 'partials'), //direccion de parciales
    extname: '.hbs' //terminaciond e nuestrs archivos
}));

app.set('view engine', '.hbs') //definimos todo lo anterios


//////////////////////////////middlewares/////////////////////////////////////////////////////

app.use(express.urlencoded({extended:false}));//urlencoded sirve para recibir cosas de formularios y esas tranzas
app.use(methodOverride('_method'));//dierve para que formularios envien metodos como borrar o crear
app.use(session({
    secret: 'contraseña',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

///////////////////////////////////////variables globales////////////////////////////////////////////////////////////////////
//flash lo usamos para mandar mensajes de errores o de cosas que se han creado satisfactoriamente
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_msg = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.Alum = req.Alum || null;//prueba para meterlo en el navegacion, solo detecta a user :c
    //res.locals.success_msg =re.flash('success_msg');
    next();
});

///////////////////////////////////////////rutas de vistas :v /////////////////////////////////////////////////////////////

app.use(require('./routes/index'));
app.use(require('./routes/questions'));
app.use(require('./routes/user'));
app.use(require('./routes/exam'));
/////////////////////////////////archivos estaticos CSS/////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));
//escuhador del servidor :v





app.listen(app.get('port'),()=>{
    console.log('hola amiwo ya esta esto :V');
    
});