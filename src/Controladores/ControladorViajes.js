//Cargamos el modelo que creamos
const ModeloViaje = require('../modelos/modeloViajes');
const msj = require("../Componentes/mensaje");

//Definición de la función
exports.listar = async (req, res) => {
    try {
        // L I S T A R -- V I A J E S
        const listaViajes = await ModeloViaje.findAll();
        //Validación por si los campos se encuentran vacios.
        if (listaViajes.length == 0) //Si lista viajes está vacío o nulo.
        {
            msj("Listar los viajes", "No existen viajes en la base de datos", 200, [], res);
        } else { //Si lista viajes tiene datos.
            msj("Éxito", "Lista de viajes", 200, listaViajes, res);
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

// G U A R D A R -- V I A J E S
exports.guardar = async (req, res) => {
    try {
        console.log(req.body);
        const {
            id_Vehiculo,
            id_Pasajero,
            latitud_Inicial,
            longitud_Inicial,
            longitud_Final,
            latitud_Final,
            fecha_Inicial,
            fecha_Final,
            fecha,
            direccion_Inicial,
            direccion_Final,
            id_Tipo_Pago,
            total,
            id_Conductor
        } = req.body;
        if (!id_Vehiculo || !id_Pasajero || !latitud_Inicial || !longitud_Inicial || !longitud_Final || !latitud_Final || !fecha_Inicial || !fecha_Final ||
            !direccion_Inicial || !direccion_Final || !id_Tipo_Pago || !total || !id_Conductor) {
            msj("Advertencia", "Debe llenar los campos que son obligatorios", 200, [], res);
        } else {
            await ModeloViaje.create({
                id_Vehiculo: id_Vehiculo,
                id_Pasajero: id_Pasajero,
                latitud_Inicial: latitud_Inicial,
                longitud_Inicial: longitud_Inicial,
                longitud_Final: longitud_Final,
                latitud_Final: latitud_Final,
                fecha_Inicial: fecha_Inicial,
                fecha_Final: fecha_Final,
                direccion_Inicial: direccion_Inicial,
                direccion_Final: direccion_Final,
                id_Tipo_Pago: id_Tipo_Pago,
                total: total,
                id_Conductor: id_Conductor
            })
                .then((data) => {
                    msj("Éxito", "El registro se almacenó correctamente.", 200, data, res);
                })
                .catch((error) => {
                    console.log(error);
                    msj("Error", "Error al momento de guardar los datos.", 200, [], res);
                });
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

// M O D I F I C A R -- V I A J E S
exports.modificar = async (req, res) => {
    try {
        const {
            id_Viaje
        } = req.query;
        const {
            estado
        } = req.body;
        if (!estado) {
            msj("Advertencia", "Debe ingresar un estado válido.", 200, [], res);
        } else {
            var buscarViaje = await ModeloViaje.findOne({
                where: {
                    id_Viaje: id_Viaje
                }
            });
            if (!buscarViaje) {
                msj("Advertencia", "El id del viaje no existe", 200, [], res)
            } else {
                buscarViaje.estado = estado;
                await buscarViaje.save()
                    .then((data) => {
                        msj("Éxito", "El registro se actualizó correctamente.", 200, data, res);
                    })
                    .catch((error) => {
                        console.log(error);
                        msj("Error", "Error al momento de actualizar los datos.", 200, [], res);
                    });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

// E L I M I N A R -- V I A J E S
exports.eliminar = async (req, res) => {
    try {
        const {
            id_Viaje
        } = req.query; //Siempre le enviamos el ID.
        if (!id_Viaje) {
            msj("Advertencia", "Ingrese un viaje existente.", 200, [], res);
        } else {
            var buscarViaje = await ModeloViaje.findOne({
                where: {
                    id_Viaje: id_Viaje
                }
            });
            if (!buscarViaje) {
                msj("Advertencia", "El id del viaje no existe", 200, [], res)
            } else {
                buscarViaje.estado = 'CNL';
                await buscarViaje.save()
                    .then((data) => {
                        msj("Éxito", "El registro se elimino correctamente.", 200, data, res);
                    })
                    .catch((error) => {
                        console.log(error);
                        msj("Error", "Error al momento de eliminar los datos.", 200, [], res);
                    });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};