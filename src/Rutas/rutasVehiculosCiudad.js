//Llamamos a router y requirimos express
const { Router } = require('express');
//Cargamos el controlador Inicio
const controladorVehiculosCiudad = require('../Controladores/ControladorVehiculosCiudad');
const { body, query } = require('express-validator');
//Creamos objeto y lo instanciamos
const router = Router();

router.get('/',controladorVehiculosCiudad.inicio);
router.get('/listar',controladorVehiculosCiudad.ListarRegistro);

router.post('/guardar' ,
body('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Ciudad').isInt().withMessage("Debe enviar un ID válido"),
controladorVehiculosCiudad.GuardarRegistro);


router.put('/modificar',
query('id_Vehiculo').isInt().withMessage("Debe enviar un ID válido"),
body('id_Ciudad').isInt().withMessage("Debe enviar un ID válido"),controladorVehiculosCiudad.ModificarRegistro);

module.exports = router;