const ModeloVehiculo = require('../Modelos/ModeloVehiculos');

const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    res.send("Estás en el Incio de Vehiculos");
};

exports.ListarVehiculos = async (req, res) => {
    const listaDeVehiculos = await ModeloVehiculo.findAll();
    if (!listaDeVehiculos) {
        res.send("No existen vehiculos en la base de datos");
    }
    else {
        res.json(listaDeVehiculos);
    }
};

exports.GuardarVehiculos = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else {
        const { placa, id_Modelo, anio, color } = req.body;

        if (!placa || !id_Modelo || !anio || !color) {
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else {
            await ModeloVehiculo.create({
               placa, id_Modelo, anio, color
            })
                .then((data) => {
                    res.send("Registro almacenado con éxito.");
                })
                .catch((error) => {
                    res.send("¡Error al guardar los datos!");
                    console.log(error);
                });
        }
    }
};

exports.ModificarVehiculos = async (req, res) => {
    const validacion = validationResult(req);
    const { id_Vehiculo } = req.query;
    const { placa, id_Modelo, anio, color } = req.body;
    if(!validacion.isEmpty)
    {
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else{
        if (!id_Vehiculo || !placa || !id_Modelo || !anio || !color) {
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else{
            var buscarVehiculo = await ModeloVehiculo.findOne({
                where: {
                    id_Vehiculo : id_Vehiculo
                }
            });
            if (!buscarVehiculo) {
                res.send("El id no existe o no se encuentra activo");
            }
            else {
                buscarVehiculo.placa =placa;
                buscarVehiculo.id_Modelo =id_Modelo;
                buscarVehiculo.anio =anio;
                buscarVehiculo.color =color;
                await buscarVehiculo.save()
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("[Advertencia] Error al modificar el resgistro [Advertencia]");
                    });
               
            }
            res.send("¡Vehiculo modificado con éxito!");
        }
    }
};

exports.EliminarVehiculos = async (req, res) => {
    const validacion = validationResult(req);
    const { id_Vehiculo } = req.query;
    const { estado } = req.body;
    if(!validacion.isEmpty)
    {
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else{
       
        if (!id_Vehiculo) {
            console.log(id_Vehiculo);
            console.log(estado);
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else{
            var buscarVehiculo = await ModeloVehiculo.findOne({
                where: {
                    id_Vehiculo: id_Vehiculo
                }
            });
            if (!buscarVehiculo) {
                res.send("El id no existe o no se encuentra activo");
            }
            else {
                buscarVehiculo.estado = estado;
                await buscarVehiculo.save()
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("[Advertencia] Error al modificar el resgistro [Advertencia]");
                    });
            }
            res.send("¡Vehiculo modificado con éxito!");
        }
    }
};