const { Router } = require('express');
const { body, query } = require('express-validator');
const ControladorCiudades = require('../Controladores/ControladorCiudades');
const controladorSesiones = require('../Controladores/controladorSesiones');
const router = Router();

router.get('/listar',controladorSesiones.validarAutenticado, ControladorCiudades.listar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.post('/guardar', controladorSesiones.validarAutenticado,
    body('id_Ciudad').isInt().withMessage('Debe enviar el ID de una ciudad.'),
    body('descripcion_Ciudad').isString(50).withMessage('Debe enviar la descripción de una ciudad.'),
ControladorCiudades.guardar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.put('/modificar', controladorSesiones.validarAutenticado,
    query('id_Ciudad').isInt().withMessage('Debe enviar el ID de una ciudad existente.'),
    body('descripcion_Ciudad').isEmpty().withMessage('Debe colocar la descripción de una ciudad'),
ControladorCiudades.modificar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.delete('/eliminar', controladorSesiones.validarAutenticado,
    query('id_Ciudad').isInt().withMessage('Debe enviar el ID de una ciudad existente'),
ControladorCiudades.eliminar);
module.exports = router;