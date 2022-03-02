const {
    Router
} = require('express');
const controladorModelos = require('../controladores/ControladorModelos');
const {
    body,
    query
} = require('express-validator');
const router = Router();
router.get('/listar', controladorModelos.listar);
router.post('/guardar', body('descripcion_Marca').isString().withMessage('Debe ingresar una marca'),
body('id_Marca').isInt().withMessage('Debe ingresar un ID de una Marca existente'),
controladorModelos.guardar);
router.put('/modificar', query('id_Modelo').isInt().withMessage('Debe enviar el ID de un Modelo existente'), controladorModelos.modificar)
router.put('/eliminar', query('id_Modelo').isInt().withMessage('Debe enviar el ID de un Modelo existente'),
controladorModelos.eliminar);

module.exports = router;