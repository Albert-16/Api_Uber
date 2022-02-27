const { Router } = require('express');
const controladorValoracion = require('../Controladores/ControladorValoraciones');
const router = Router();
router.get('/listar', controladorValoracion.listar);
router.post('/guardar', controladorValoracion.guardar);
router.put('/modificar', controladorValoracion.modificar);
router.delete('/eliminar', controladorValoracion.eliminar);
module.exports = router;