const {Router} = require('express');
const controladorModelos = require('../controladores/ControladorModelos');
const {body,query} = require('express-validator');
const controladorSesiones = require('../Controladores/controladorSesiones');
const router = Router();
router.get('/listar',controladorSesiones.validarAutenticado, controladorModelos.listar);
router.post('/guardar',controladorSesiones.validarAutenticado,
    body('descripcion_Modelo').isString().withMessage('Debe ingresar un Modelo'),
    body('id_Marca').isInt().withMessage('Debe ingresar un ID de una Marca existente'),
    controladorModelos.guardar);

router.put('/modificar',controladorSesiones.validarAutenticado,
    query('id_Modelo').isInt().withMessage('Debe enviar el ID de un Modelo existente'),
    body('descripcion_Modelo').isString().withMessage('Debe ingresar un Modelo'),
    body('id_Marca').isInt().withMessage('Debe ingresar un ID de una Marca existente'),
    controladorModelos.modificar);
    
router.put('/eliminar',controladorSesiones.validarAutenticado, query('id_Modelo').isInt().withMessage('Debe enviar el ID de un Modelo existente'),
    controladorModelos.eliminar);

module.exports = router;