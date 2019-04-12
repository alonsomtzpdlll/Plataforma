const mongoose = require ('mongoose');

mongoose.set('useFindAndModify', false);
//configuracion de database :)
mongoose.connect('mongodb+srv://alonso:alonso@cluster0-2i7ap.mongodb.net/test?retryWrites=true',{
  useCreateIndex: true,
  useNewUrlParser: true
  //useFindAndModify: false
})
//ver si hay error o si se conecto amiwo
  .then(db => console.log(' si sirve la base de datos y se conecto'))
  .catch(err => console.error(err));
  