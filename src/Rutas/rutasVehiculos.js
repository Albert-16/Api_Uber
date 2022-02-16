//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const controladorVehiculo = require('../Controladores/ControladorVehiculos');
const { body, query } = require('express-validator');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorVehiculo.inicio);
router.get('/listar',controladorVehiculo.ListarVehiculos);


router.post('/guardar' ,
body('placa').isLength({min:7}).withMessage("La placa debe contener un mínimo de 7 caracteres"),
body('anio').isInt().withMessage('Debe enviar un año válido'),controladorVehiculo.GuardarVehiculos);


router.put('/modificar',
query('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('placa').isLength({min:7}).withMessage("La placa debe contener un mínimo de 7 caracteres"),
body('anio').isInt().withMessage('Debe enviar un año válido'),controladorVehiculo.ModificarVehiculos);


router.put('/eliminar',
query('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),controladorVehiculo.EliminarVehiculos);

module.exports = router;