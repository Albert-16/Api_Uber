const { Router } = require('express');
const controladorViaje = require('../controladores/ControladorViajes');
const { body, query } = require('express-validator');
const router = Router();
router.get('/listar', controladorViaje.listar);
router.post('/guardar', body('id_Viaje').isInt().withMessage('Debe enviar el ID de un viaje existente'),
    body('latitud_Inicial').isString(100).withMessage('Es necesario ingresar una latitud inicial'),
    body('longitud_Inicial').isString(100).withMessage('Es necesario ingresar una longitud inicial'),
    body('latitud_Final').isString(100).withMessage('Es necesario ingresar una latitud final'),
    body('longitud_Final').isString(100).withMessage('Es necesario ingresar una longitud final'),
    body('fecha_Inicial').isDate().withMessage('Es necesario ingresar una fecha incial'),
    body('fecha_Final').isDate().withMessage('Es necesario ingresar una fecha final'),
    body('direccion_Inicial').isString(200).withMessage('Es necesario ingresar una dirección inicial'),
    body('direccion_Final').isString(200).withMessage('Es necesario ingresar una dirección final'),
    body('total').isDecimal().withMessage('Es necesario ingresar un total valido'),controladorViaje.guardar);
router.put('/modificar', controladorViaje.modificar);
router.put('/eliminar', controladorViaje.eliminar);
module.exports = router;