//Declaracion de Variables 
const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
const passport = require('passport');
//Asignacion del puerto a utilizar
app.set('port', process.env.PORT || 4005);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 2);
app.use(passport.initialize());

//Declaramos las rutas que vamos a usar
app.use('/uber/', require('./Rutas/index'));
app.use('/uber/vehiculos', require('./Rutas/rutasVehiculos'));
app.use('/uber/vehiculos_Ciudad', require('./Rutas/rutasVehiculosCiudad'));


//Iniciaríamos el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor del Uber iniciado en el puerto:', app.get('port'));
});