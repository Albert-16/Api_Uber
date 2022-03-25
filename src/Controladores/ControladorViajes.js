//Cargamos el modelo que creamos
const ModeloViaje = require('../modelos/modeloViajes');
const msj = require("../Componentes/mensaje");
const con = require("../Configuracion/coneccionMysql");
const { validationResult } = require('express-validator');
//Definición de la función
exports.listar = async (req, res) => {
    try {
        var ListaViajes = [];
        const query = "select * from listaviajes;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaViajes = result;
                const totalRegistros = result.length;
                if (!ListaViajes) {
                    msj("Lista Vaciá", "No existen viajes en la base de datos", 200, [], res);
                }
                else {
                    msj("Lista de Viajes", "Total de registros: " + totalRegistros, 200, ListaViajes, res);
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};


exports.totalViajes = async (req, res) => {
    try {
        var ListaViajesByUser = [];
        const { id } = req.query;
        const query = "select coalesce(count(*),0) total ,coalesce(sum(distancia_Km),0) 'KmReccoridos' from viajes where id_Pasajero = ? ;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query,[id], function (err, result, fields) {
                if (err) throw err;
                ListaViajesByUser = result;
                const totalRegistros = result.length;
                if (!ListaViajesByUser) {
                    msj("Lista Vaciá", "No existen viajes en la base de datos", 200, [], res);
                }
                else {
                    msj("Lista de Viajes", "Total de registros: " + totalRegistros, 200,  ListaViajesByUser, res);
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function ObtenerTotal(distancia) {
    var tarifaSugerida = 100;
    var total = tarifaSugerida * distancia;
    return parseFloat(total);
}


exports.getKilometros = function (lat1, lng1, lat2, lng2) {
    // El radio del planeta tierra en metros.
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
        *
        Math.sin(dLat / 2)
        +
        Math.cos(degreesToRadians(lat1))
        *
        Math.cos(degreesToRadians(lat1))
        *
        Math.sin(dLong / 2)
        *
        Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance.toFixed(2);
}

// G U A R D A R -- V I A J E S
exports.guardar = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {


            const {
                id_Vehiculo,
                id_Pasajero,
                latitud_Inicial,
                longitud_Inicial,
                longitud_Final,
                latitud_Final,
                fecha_Inicial,
                direccion_Inicial,
                direccion_Final,
                id_Tipo_Pago,
                total,
                id_Conductor
            } = req.body;
            if (!id_Vehiculo || !id_Pasajero || !latitud_Inicial || !longitud_Inicial || !longitud_Final || !latitud_Final || !fecha_Inicial || 
                !direccion_Inicial || !direccion_Final || !id_Tipo_Pago || !total || !id_Conductor) {
                msj("Advertencia", "Debe llenar los campos que son obligatorios", 200, [], res);
            } else {
                var distancia = this.getKilometros(parseFloat(latitud_Inicial), parseFloat(longitud_Inicial), parseFloat(latitud_Final), parseFloat(longitud_Final));

                await ModeloViaje.create({
                   ...req.body
                })
                    .then((data) => {
                        msj("Éxito", "El registro se almacenó correctamente.", 200, data, res);
                    })
                    .catch((error) => {
                        console.log(error);
                        msj("Error", "Error al momento de guardar los datos.", 200, [], res);
                    });
            }
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
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {
            const { id_Viaje } = req.query;
            const { estado } = req.body;
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
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {
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
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};