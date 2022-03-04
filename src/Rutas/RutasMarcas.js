const {Router} = require('express');
const controladorMarcas = require('../controladores/ControladorMarcas');
const controladorSesiones = require('../Controladores/controladorSesiones');
const {body,query} = require('express-validator');
const router = Router();

router.get('/listar',controladorSesiones.validarAutenticado, controladorMarcas.listar);
router.post('/guardar',controladorSesiones.validarAutenticado,
    body('descripcion_Marca').isString().withMessage('Debe ingresar una marca'),
    controladorMarcas.guardar);
router.put('/modificar',controladorSesiones.validarAutenticado,
query('id_Marca').isInt().withMessage('Debe enviar el ID de una Marca existente'), controladorMarcas.modificar)
router.put('/eliminar',controladorSesiones.validarAutenticado,
query('id_Marca').isInt().withMessage('Debe enviar el ID de una Marca existente'),
    controladorMarcas.eliminar);

module.exports = router;