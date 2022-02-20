const { Router } = require('express');
const controladorViaje = require('../controladores/ControladorViajes');
const router = Router();
router.get('/listar', controladorViaje.listar);
router.post('/guardar', controladorViaje.guardar);
module.exports = router;