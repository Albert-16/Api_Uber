const ModeloTiposDePagos = require('../Modelos/ModeloTiposPagos');

const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    res.send("Estás en el Incio de Vehiculos_Ciudad");
};

exports.ListarRegistro = async (req, res) => {
    const listaDeVehiculos = await ModeloTiposDePagos.findAll();
    if (!listaDeVehiculos) {
        res.send("No Registros vehiculos en la base de datos");
    }
    else {
        res.json(listaDeVehiculos);
    }
};

exports.GuardarRegistro = async (req, res) => {
    const validacion = validationResult(req);
    const { descripcion_Pago } = req.body;
    if (!validacion.isEmpty()) {
        
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else {
        if (!descripcion_Pago) {
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else {
            await ModeloTiposDePagos.create({
                    descripcion_Pago
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
    const { id_Tipos_Pago } = req.query;
    const { descripcion_Pago } = req.body;
    if(!validacion.isEmpty)
    {
        console.log(validacion.array());
        res.send(validacion.array());
    }
    else{
       
        if (!id_Tipos_Pago  || !descripcion_Pago) {
            res.send("[Advertencia] Debe enviar los datos completos [Advertencia]");
        }
        else{
            var buscarVehiculo = await ModeloTiposDePagos.findOne({
                where: {
                    id_Tipos_Pago  : id_Tipos_Pago 
                }
            });
            if (!buscarVehiculo) {
                res.send("El id no existe o no se encuentra activo");
            }
            else {
                buscarVehiculo.descripcion_Pago = descripcion_Pago;

                await buscarVehiculo.save()
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("[Advertencia] Error al modificar el resgistro [Advertencia]");
                    });
               
            }
            res.send("¡Registro modificado con éxito!");
        }
    }
};
