const ModeloVehiculo = require('../Modelos/ModeloVehiculos');
const msj = require('../Componentes/mensaje');
const con = require('../Configuracion/coneccionMysql');
const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    msj("Inicio", "Estás en el Inicio de Vehículos", 200, [], res);
};

exports.ListarVehiculos = async (req, res) => {

    try {
        var ListaVehiculos = [];
        const query = "select * from listarvehiculos;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaVehiculos = result;
                const totalRegistros = result.length;
                if (!ListaVehiculos) {
                    msj("Lista Vaciá", "No existen vehículos en la base de datos", 200, [], res);
                }
                else {
                    msj("Lista de Vehículos", "Total de registros: " + totalRegistros, 200, ListaVehiculos, res);
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

exports.getDatos = async (req,res) =>{
    try {
        var Lista = [];
        const query = "SELECT id_Vehiculo as value , concat(nombre,' ',placa) as label FROM system_uber.vehiculos where estado = 1;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                Lista = result;
                const totalRegistros = result.length;
                if (!Lista) {
                    msj("Lista Vaciá", "No existen Modelos en la base de datos", 200, [], res);
                }
                else {
                   res.json(Lista);
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}

exports.GuardarVehiculos = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {
            const { placa, id_Modelo, anio, color } = req.body;

            if (!placa || !id_Modelo || !anio || !color) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {
                await ModeloVehiculo.create({...req.body})
                    .then((data) => {
                        msj("Registro Guardado", "Registro almacenado con éxito.", 200, data, res);
                    })
                    .catch((error) => {
                        msj("Error", "¡Error al guardar los datos!", 200, [], res);
                        console.log(error);
                    });
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }

};

exports.ModificarVehiculos = async (req, res) => {
    try {
        const validacion = validationResult(req);
        const { id_Vehiculo } = req.query;
        const { placa, id_Modelo, anio, color } = req.body;
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {
            if (!id_Vehiculo || !placa || !id_Modelo || !anio || !color) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {
                var buscarVehiculo = await ModeloVehiculo.findOne({
                    where: {
                        id_Vehiculo: id_Vehiculo
                    }
                });
                if (!buscarVehiculo) {
                    msj("Vehiculo no encontrado", "No se encontró el vehículo.", 200, [], res);
                }
                else {
                    buscarVehiculo.placa = placa;
                    buscarVehiculo.id_Modelo = id_Modelo;
                    buscarVehiculo.anio = anio;
                    buscarVehiculo.color = color;
                    await buscarVehiculo.save()
                        .then((data) => {
                            msj("Registro Actualizado", "¡Vehiculo modificado con éxito!", 200, data, res);
                        })
                        .catch((error) => {
                            console.log(error);
                            msj("Advertencia", "Error al modificar el registro [Advertencia]", 200, error, res);
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

exports.EliminarVehiculos = async (req, res) => {

    try {
        const validacion = validationResult(req);
        const { id_Vehiculo } = req.query;
        const { estado } = req.body;
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {

            if (!id_Vehiculo) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {
                var buscarVehiculo = await ModeloVehiculo.findOne({
                    where: {
                        id_Vehiculo: id_Vehiculo
                    }
                });
                if (!buscarVehiculo) {
                    msj("Vehiculo no encontrado", "No se encontró el vehículo.", 200, [], res);
                }
                else {
                    buscarVehiculo.estado = estado;
                    await buscarVehiculo.save()
                        .then((data) => {
                            msj("Registro Eliminado", "¡Vehiculo Eliminado con éxito!", 200, data, res);
                        })
                        .catch((error) => {
                            console.log(error);
                            msj("Advertencia", " Error al eliminar el registro", 200, error, res);
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