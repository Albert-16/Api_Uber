const { Router } = require("express");
const router = Router();
const msj = require("../Componentes/mensaje");
const controladorUsuario = require('../Controladores/ControladorUsuarios');
const controladorSesiones = require('../Controladores/controladorSesiones');
const {body ,query } = require('express-validator');



router.get("/", (req, res) => {
  var hoy = new Date();

  var fecha = hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  var fechaYHora = fecha + ' ' + hora;
  const Data = {
    Aviso: "Buenos Dias",
    "Fecha y Hora": fechaYHora,
  };
  msj(
    "Login",
    "Bienvenido a nuestro Servicio de Uber",
    200,
    Data,
    res
  );
});


router.get('/listaUsuarios',controladorSesiones.validarAutenticado,controladorUsuario.ListarUsuarios);
router.post('/guardarUsuarios',controladorSesiones.validarAutenticado,
body('dni').isLength({max:13,min:13}).withMessage("El número de identidad no es valido ,solo se permiten 13 caracteres."),
body('nombre').isLength({min:2}).withMessage("El nombre no es valido,debe contener al menos 2 caracteres..."),
body('apellido').isLength({min:2}).withMessage("El apellido no es valido,debe contener al menos 2 caracteres..."),
body('telefono').isLength({min:8}).withMessage("El teléfono no es valido,debe contener al menos 8 caracteres..."),
body('correo').isEmail().withMessage("Ingrese un Correo Electrónico Valido..."),
body('contrasenia').isLength({min:8}).withMessage("La Contraseña debe contener al menos 8 caracteres..."),
controladorUsuario.GuardarUsuarios);

router.put('/editarUsuarios',controladorSesiones.validarAutenticado,
query('id').isInt().withMessage("Debe ser un numero entero"),
body('dni').isLength({max:13,min:13}).withMessage("El número de identidad no es valido ,solo se permiten 13 caracteres."),
body('nombre').isLength({min:2}).withMessage("El nombre no es valido,debe contener al menos 2 caracteres..."),
body('apellido').isLength({min:2}).withMessage("El apellido no es valido,debe contener al menos 2 caracteres..."),
body('telefono').isLength({min:8}).withMessage("El teléfono no es valido,debe contener al menos 8 caracteres..."),
body('correo').isEmail().withMessage("Ingrese un Correo Electrónico Valido..."),
body('contrasenia').isLength({min:8}).withMessage("La Contraseña debe contener al menos 8 caracteres..."),
controladorUsuario.EditarUsuario);


router.put('/eliminarUsuarios',
query('id').isInt().withMessage("Debe ser un numero entero"),
controladorSesiones.validarAutenticado,controladorUsuario.EliminarUsuario);

router.post('/login',controladorSesiones.IncioSesion);
router.get('/error',controladorSesiones.ValidarToken);
router.post('/recuperarContrasenia',
controladorSesiones.RecuperarCorreo);
router.post('/restablecerContrasenia',
body('contrasenia').isLength({min:8}).withMessage("La Contraseña debe contener al menos 8 caracteres..."),
body('pin').isInt().withMessage("Ingrese un pin valido..."),
controladorSesiones.RestablecerContraseña);

module.exports = router;
