//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const controladorTiposDePagos = require('../Controladores/ControladorTiposDePagos');
const { body, query } = require('express-validator');
const controladorSesiones = require('../Controladores/controladorSesiones');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorSesiones.validarAutenticado,controladorTiposDePagos.inicio);
router.get('/listar',controladorSesiones.validarAutenticado,controladorTiposDePagos.ListarRegistro);

router.post('/guardar',controladorSesiones.validarAutenticado,
body('descripcion_Pago').isLength({min:7}).withMessage("Debe contener un mínimo de 7 caracteres"),
controladorTiposDePagos.GuardarRegistro);

router.put('/modificar',controladorSesiones.validarAutenticado,
query(' id_Tipos_Pago ').isInt().withMessage("Debe enviar un ID válido"),
body('descripcion_Pago').isLength({min:7}).withMessage("Debe contener un mínimo de 7 caracteres"),
controladorTiposDePagos.ModificarRegistro);

module.exports = router;