//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const controladorVehiculo = require('../Controladores/ControladorVehiculos');
const controladorSesiones = require('../Controladores/controladorSesiones');
const { body, query } = require('express-validator');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorVehiculo.inicio , controladorSesiones.validarAutenticado);
router.get('/listar',controladorSesiones.validarAutenticado,controladorVehiculo.ListarVehiculos);
router.get('/listarVehiculos',controladorSesiones.validarAutenticado,controladorVehiculo.getDatos);

router.post('/guardar' , controladorSesiones.validarAutenticado,
body('placa').isLength({min:7 ,max:7}).withMessage("La placa solo debe contener 7 caracteres"),
body('id_Modelo').isInt().withMessage("Debe enviar un ID válido"),
body('anio').isInt().withMessage('Debe enviar un año válido'),controladorVehiculo.GuardarVehiculos);


router.put('/modificar',controladorSesiones.validarAutenticado,
query('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('placa').isLength({min:7 ,max:7}).withMessage("La placa solo debe contener 7 caracteres"),
body('id_Modelo').isInt().withMessage("Debe enviar un ID válido"),
body('anio').isInt().withMessage('Debe enviar un año válido')
,controladorVehiculo.ModificarVehiculos);


router.put('/eliminar',controladorSesiones.validarAutenticado,
query('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),controladorVehiculo.EliminarVehiculos);

module.exports = router;