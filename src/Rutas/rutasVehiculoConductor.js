const { Router } = require("express");
const router = Router();
const msj = require("../Componentes/mensaje");
const controladorVehiculosConductor = require('../Controladores/ControladorVehiculosConductor');
const controladorSesiones = require('../Controladores/controladorSesiones');
const {body ,query } = require('express-validator');

router.get('/Listar',
controladorSesiones.validarAutenticado,
controladorVehiculosConductor.ListarVehiculosByConductor);



router.post('/Guardar',controladorVehiculosConductor.GuardarVehiculoByCondcutor);
router.put('/Modificar',controladorVehiculosConductor.EditarVehiculoByCondcutor);
router.delete('/Eliminar',controladorVehiculosConductor.EliminarVehiculoByCondcutor);

module.exports = router;