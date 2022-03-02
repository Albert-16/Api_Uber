const {
    Router
} = require('express');
const controladorMarcas = require('../controladores/ControladorMarcas');
const {
    body,
    query
} = require('express-validator');
const router = Router();
router.get('/listar', controladorMarcas.listar);
router.post('/guardar', body('id_Marca').isInt().withMessage('Debe enviar el ID de una Marca existente'),
    body('descripcion_Marca').isString().withMessage('Debe ingresar una marca'),
    controladorMarcas.guardar);
router.put('/modificar', query('id_Marca').isInt().withMessage('Debe enviar el ID de una Marca existente'), controladorMarcas.modificar)
router.put('/eliminar', query('id_Marca').isInt().withMessage('Debe enviar el ID de una Marca existente'),
    controladorMarcas.eliminar);

module.exports = router;