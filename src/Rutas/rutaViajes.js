const {Router} = require('express');
const controladorViaje = require('../controladores/ControladorViajes');
const {body,query} = require('express-validator');
const controladorSesiones = require('../Controladores/controladorSesiones');
const router = Router();
router.get('/listar',controladorSesiones.validarAutenticado, controladorViaje.listar);
router.post('/guardar',controladorSesiones.validarAutenticado,
    body('id_Vehiculo').isInt().withMessage('Debe enviar el ID de un vehículo existente'),
    body('id_Pasajero').isInt().withMessage('Debe enviar el ID de un pasajero existente'),
    body('id_Tipo_Pago').isInt().withMessage('Debe enviar el ID de un tipo de pago existente'),
    body('id_Conductor').isInt().withMessage('Debe enviar el ID de un conductor existente'),
    body('estado').isEmpty().withMessage('Debe seleccionar un estado existente'),
    body('latitud_Inicial').isString(100).withMessage('Es necesario ingresar una latitud inicial'),
    body('longitud_Inicial').isString(100).withMessage('Es necesario ingresar una longitud inicial'),
    body('latitud_Final').isString(100).withMessage('Es necesario ingresar una latitud final'),
    body('longitud_Final').isString(100).withMessage('Es necesario ingresar una longitud final'),
    body('fecha_Inicial').isDate().withMessage('Es necesario ingresar una fecha inicial'),
    body('direccion_Inicial').isString(200).withMessage('Es necesario ingresar una dirección inicial'),
    body('direccion_Final').isString(200).withMessage('Es necesario ingresar una dirección final'),
    body('total').isDecimal().withMessage('Es necesario ingresar un total valido'), controladorViaje.guardar);

router.put('/modificar',controladorSesiones.validarAutenticado, query('id_Viaje').isInt().withMessage('Debe enviar el ID de un viaje existente'),
    body('estado').isEmpty().withMessage('Debe seleccionar un estado existente'), controladorViaje.modificar);

router.put('/eliminar',controladorSesiones.validarAutenticado, query('id_Viaje').isInt().withMessage('Debe enviar el ID de un viaje existente'), controladorViaje.eliminar);
module.exports = router;