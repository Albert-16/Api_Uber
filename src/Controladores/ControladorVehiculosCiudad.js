const ModeloVehiculosCiudad = require('../Modelos/ModeloVehiculosCiudad');

const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    res.send("Estás en el Incio de Vehiculos_Ciudad");
};

exports.ListarRegistro = async (req, res) => {
    const listaDeVehiculos = await ModeloVehiculosCiudad.findAll();
    if (!listaDeVehiculos) {
        res.send("No existen vehiculos en la base de datos");
    }
    else {
        res.json(listaDeVehiculos);
    }
};

exports.GuardarRegistro = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else {
        const { id_Vehiculo, id_Ciudad } = req.body;

        if (!id_Vehiculo || !id_Ciudad) {
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else {
            await ModeloVehiculosCiudad.create({
               id_Vehiculo,id_Ciudad
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

exports.ModificarRegistro = async (req, res) => {
    const validacion = validationResult(req);
    const { id_Vehiculo, id_Ciudad } = req.body;
    if(!validacion.isEmpty)
    {
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else{
       
        if (!id_Vehiculo || !id_Ciudad) {
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else{
            var buscarVehiculo = await ModeloVehiculosCiudad.findOne({
                where: {
                    id_Vehiculo : id_Vehiculo
                }
            });
            if (!buscarVehiculo) {
                res.send("El id no existe o no se encuentra activo");
            }
            else {
                buscarVehiculo.id_Ciudad = id_Ciudad;

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
