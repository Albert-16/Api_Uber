//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const controladorVehiculosCiudad = require('../Controladores/ControladorVehiculosCiudad');
const { body, query } = require('express-validator');
const controladorSesiones = require('../Controladores/controladorSesiones');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorVehiculosCiudad.inicio,controladorSesiones.validarAutenticado);
router.get('/listar',controladorSesiones.validarAutenticado,controladorVehiculosCiudad.ListarRegistro);

router.post('/guardar' ,controladorSesiones.validarAutenticado,
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Ciudad').isInt().withMessage("Debe enviar un ID válido"),
controladorVehiculosCiudad.GuardarRegistro);


router.put('/modificar',controladorSesiones.validarAutenticado,
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Ciudad').isInt().withMessage("Debe enviar un ID válido"),controladorVehiculosCiudad.ModificarRegistro);


router.delete('/eliminar',controladorSesiones.validarAutenticado,
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Ciudad').isInt().withMessage("Debe enviar un ID válido"),controladorVehiculosCiudad.EliminarRegistro);

module.exports = router;