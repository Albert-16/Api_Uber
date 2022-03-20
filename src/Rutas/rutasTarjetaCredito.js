//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const ControladorPagos = require('../Controladores/ControladorPagos');
const { body, query } = require('express-validator');
const controladorSesiones = require('../Controladores/controladorSesiones');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorSesiones.validarAutenticado,ControladorPagos.inicio);
router.get('/listar',controladorSesiones.validarAutenticado,ControladorPagos.ListarRegistro);

router.post('/guardar',controladorSesiones.validarAutenticado,
query('id_Usuarios').isInt().withMessage("Debe enviar un ID válido"),
body('titular_Tarjeta').isLength({min:6}).withMessage("Debe contener un mínimo de 6 caracteres"),
body('numeroTarjeta').isLength({min:16}).withMessage("Debe ingresar 16 digitos como minimo"),
body('fecha_Vencimiento').isLength({min:4},{max:4}).withMessage("Debe ingresar 4 digitos"),
body('CVC').isLength({min:3},{max:4}).withMessage("Debe ingresar 3 digitos como minimo y 4 como maximo"),
body('correo_Electronico').isEmail().withMessage("Debe ingresar una direccion de correo electronica valida"),
ControladorPagos.GuardarRegistro,
)

router.put('/modificar',controladorSesiones.validarAutenticado,
query('id_Usuarios').isInt().withMessage("Debe enviar un ID válido"),
query('idTarjeta_Credito').isInt().withMessage("Debe enviar un ID válido"),
body('titular_Tarjeta').isLength({min:6}).withMessage("Debe contener un mínimo de 6 caracteres"),
body('numeroTarjeta').isLength({min:16}).withMessage("Debe ingresar 16 digitos como minimo"),
body('fecha_Vencimiento').isLength({min:4},{max:4}).withMessage("Debe ingresar 4 digitos"),
body('CVC').isLength({min:3},{max:4}).withMessage("Debe ingresar 3 digitos como minimo y 4 como maximo"),
body('correo_Electronico').isEmail().withMessage("Debe ingresar una direccion de correo electronica valida"),
ControladorPagos.ModificarRegistro,
)

module.exports = router;