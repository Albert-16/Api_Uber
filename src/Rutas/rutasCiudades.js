const { Router } = require('express');
const { body, query } = require('express-validator');
const ControladorCiudades = require('../Controladores/ControladorCiudades');
const router = Router();

router.get('/listar', ControladorCiudades.listar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.post('/guardar', 
    body('id_Ciudad').isInt().withMessage('Debe enviar el ID de una ciudad.'),
    body('descripcion_Ciudad').isString(50).withMessage('Debe enviar la descripción de una ciudad.'),
ControladorCiudades.guardar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.put('/modificar', 
    query('id_Ciudad').isInt().withMessage('Debe enviar el ID de una ciudad existente.'),
    body('descripcion_Ciudad').isEmpty().withMessage('Debe colocar la descripción de una ciudad'),
ControladorCiudades.modificar);
/*-----------------------------------------------------------------------------------------------------------*/ 
router.delete('/eliminar', 
    query('id_Ciudad').isInt().withMessage('Debe enviar el ID de una ciudad existente'),
ControladorCiudades.eliminar);
module.exports = router;