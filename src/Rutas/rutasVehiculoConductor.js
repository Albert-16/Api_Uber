const { Router } = require("express");
const router = Router();
const msj = require("../Componentes/mensaje");
const controladorVehiculosConductor = require('../Controladores/ControladorVehiculosConductor');
const controladorSesiones = require('../Controladores/controladorSesiones');
const {body ,query } = require('express-validator');

router.get('/Listar',
controladorSesiones.validarAutenticado,
controladorVehiculosConductor.ListarVehiculosByConductor);



router.post('/Guardar',controladorSesiones.validarAutenticado,
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Conductor').isInt().withMessage("Debe enviar un ID válido"),
controladorVehiculosConductor.GuardarVehiculoByCondcutor);

router.put('/Modificar',
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Conductor').isInt().withMessage("Debe enviar un ID válido"),
controladorSesiones.validarAutenticado,
controladorVehiculosConductor.EditarVehiculoByCondcutor);

router.delete('/Eliminar',
controladorSesiones.validarAutenticado,
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Conductor').isInt().withMessage("Debe enviar un ID válido"),
controladorVehiculosConductor.EliminarVehiculoByCondcutor);

module.exports = router;