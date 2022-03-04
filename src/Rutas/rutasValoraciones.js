const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorValoracion = require('../Controladores/ControladorValoraciones');
const controladorSesiones = require('../Controladores/controladorSesiones');
const router = Router();

router.get('/listar', controladorSesiones.validarAutenticado,controladorValoracion.listar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.post('/guardar', controladorSesiones.validarAutenticado,
    body('id_Valoracion').isInt().withMessage('Debe enviar el ID de una valoración.'),
    body('cantidad_estrellas').isInt().withMessage('Debe enviar una cantidad de estrellas.'),
    body('id_Viaje').isInt().withMessage('Debe enviar un ID de viaje existente.'),
controladorValoracion.guardar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.put('/modificar', controladorSesiones.validarAutenticado,
    query('id_Valoracion').isInt().withMessage('Debe enviar el ID de una valoración existente.'),
    body('cantidad_estrellas').isEmpty().withMessage('Debe colocar una cantidad de estrellas'),
controladorValoracion.modificar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.delete('/eliminar', controladorSesiones.validarAutenticado,
    query('id_Valoracion').isInt().withMessage('Debe enviar el ID de una valoracion existente'),
controladorValoracion.eliminar);
module.exports = router;