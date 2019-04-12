//crearemos hellpers :V
//objeto con metodos
const helpers = {};
//esto es para revisar si hay una sesión ativa o no para mostrar ciertos valores
helpers.simon = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'No autorizado.');
    res.redirect('/user/signinAlumnos');
  };
  
  module.exports = helpers;