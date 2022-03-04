const ModeloTiposDePagos = require('../Modelos/ModeloTiposPagos');
const msj = require("../Componentes/mensaje");
const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    msj("Inicio", "Estás en el Inicio de Tipos de Pago", 200, [], res);
};

exports.ListarRegistro = async (req, res) => {

    try {
        const listaDeVehiculos = await ModeloTiposDePagos.findAll({
            attributes: [
                ['id_Tipos_Pago', '#ID'],
                ['descripcion_Pago', 'Tipo de Pago']
            ]
        });
        if (!listaDeVehiculos) {
            msj("Lista Vaciá", "No Registros vehículos en la base de datos", 200, [], res);
        }
        else {
            msj("Métodos de Pago", "Total de Registros: " + listaDeVehiculos.length, 200, listaDeVehiculos, res);
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }

};

exports.GuardarRegistro = async (req, res) => {
    try {
        const validacion = validationResult(req);
        const { descripcion_Pago } = req.body;
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {
            if (!descripcion_Pago) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {

                const ExistTipoPago = await ModeloTiposDePagos.findOne({
                    where: {
                        descripcion_Pago: descripcion_Pago
                    }
                });

                if (ExistTipoPago) {
                    msj("Advertencia", "El tipo de pago que trata de ingresar ya existe.", 200, [], res);
                }
                else {
                    await ModeloTiposDePagos.create({
                        descripcion_Pago
                    })
                        .then((data) => {
                            msj("Registro Guardado", "Registro almacenado con éxito.", 200, data, res);
                        })
                        .catch((error) => {
                            msj("Error al Guardar", "¡Error al guardar los datos!", 200, [], res);

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

exports.ModificarRegistro = async (req, res) => {
    try {
        const validacion = validationResult(req);
        const { id_Tipos_Pago } = req.query;
        const { descripcion_Pago } = req.body;
        if (!validacion.isEmpty) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {

            if (!id_Tipos_Pago || !descripcion_Pago) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {
                var buscarTipoPago = await ModeloTiposDePagos.findOne({
                    where: {
                        id_Tipos_Pago: id_Tipos_Pago
                    }
                });
                if (!buscarTipoPago) {
                    msj("Tipo de pago no encontrado", "El id no existe o no se encuentra activo");
                }
                else {
                    buscarTipoPago.descripcion_Pago = descripcion_Pago;

                    await buscarTipoPago.save()
                        .then((data) => {
                            msj("Registro Actualizado", "¡Registro modificado con éxito!", 200, data, res);
                        })
                        .catch((error) => {
                            console.log(error);
                            msj("Advertencia", "Error al modificar el registro.", 200, [], res);
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

