const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorValoracion = require('../Controladores/ControladorValoraciones');
const router = Router();

router.get('/listar', controladorValoracion.listar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.post('/guardar', 
    body('id_Valoracion').isInt().withMessage('Debe enviar el ID de una valoración.'),
    body('cantidad_estrellas').isInt().withMessage('Debe enviar una cantidad de estrellas.'),
    body('id_Viaje').isInt().withMessage('Debe enviar un ID de viaje existente.'),
controladorValoracion.guardar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.put('/modificar', 
    query('id_Valoracion').isInt().withMessage('Debe enviar el ID de una valoración existente.'),
    body('cantidad_estrellas').isEmpty().withMessage('Debe colocar una cantidad de estrellas'),
controladorValoracion.modificar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.delete('/eliminar', 
    query('id_Valoracion').isInt().withMessage('Debe enviar el ID de una valoracion existente'),
controladorValoracion.eliminar);
module.exports = router;