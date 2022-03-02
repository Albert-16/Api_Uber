//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const controladorTiposDePagos = require('../Controladores/ControladorTiposDePagos');
const { body, query } = require('express-validator');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorTiposDePagos.inicio);
router.get('/listar',controladorTiposDePagos.ListarRegistro);

router.post('/guardar',
body('descripcion_Pago').isLength({min:7}).withMessage("La placa debe contener un mínimo de 7 caracteres"),
controladorTiposDePagos.GuardarRegistro);

router.put('/modificar',
query(' id_Tipos_Pago ').isInt().withMessage("Debe enviar un ID válido"),
body('descripcion_Pago').isLength({min:7}).withMessage("La placa debe contener un mínimo de 7 caracteres"),
controladorTiposDePagos.ModificarRegistro);

module.exports = router;