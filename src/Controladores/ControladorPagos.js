const ModeloPagos = require('../Modelos/ModeloPagos');
const msj = require("../Componentes/mensaje");
const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    msj("Inicio", "Estás en el Inicio de Pagos con Tarjeta", 200, [], res);
};

exports.ListarRegistro = async (req, res) => {

    try {
        const listaDePagos = await ModeloPagos.findAll({
            attributes: [
                ['idTarjeta_Credito', '#ID'],
                ['titular_Tarjeta', 'Titular de la Tarjeta'],
                ['numeroTarjeta', 'Numero de la Tarjeta'],
                ['CVC',"CVC"],
                ['correo_Electronico', 'Correo Electronico'],
                ['id_Usuarios', 'ID Usuario']
            ]
        });
        if (!listaDePagos) {
            msj("Lista Vacía", "No hay registros de Tarjetas de Credito en la base de datos", 200, [], res);
        }
        else {
            msj("Tarjetas de Credito", "Total de Registros: " + listaDePagos.length, 200, listaDePagos, res);
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
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {
           
            const {id_Usuarios, titular_Tarjeta, numeroTarjeta, fecha_Vencimiento, CVC, correo_Electronico } = req.body;
            if (!id_Usuarios || !titular_Tarjeta || !numeroTarjeta || !fecha_Vencimiento || !CVC || !correo_Electronico) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {
                await ModeloPagos.create({
                    ...req.body
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
    catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

exports.ModificarRegistro = async (req, res) => {
    try {
        const validacion = validationResult(req);
        const { idTarjeta_Credito, id_Usuarios } = req.query;
        const { titular_Tarjeta, numeroTarjeta, fecha_Vencimiento, CVC, correo_Electronico } = req.body;
    if (!validacion.isEmpty) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        }
        else {

            if (!idTarjeta_Credito|| !id_Usuarios || !titular_Tarjeta || !numeroTarjeta || !fecha_Vencimiento || !CVC || !correo_Electronico) {
                msj("Advertencia", " Debe enviar los datos completos.", 200, [], res);
            }
            else {
                var buscarTarjetaCredito = await ModeloPagos.findOne({
                    where: {
                        idTarjeta_Credito: idTarjeta_Credito
                    }
                });
                if (!buscarTarjetaCredito) {
                    msj("Tipo de pago no encontrado", "El id no existe o no se encuentra activo");
                }
                else {     
                    buscarTarjetaCredito.id_Usuarios = id_Usuarios;             
                    buscarTarjetaCredito.titular_Tarjeta = titular_Tarjeta;
                    buscarTarjetaCredito.numeroTarjeta = numeroTarjeta;
                    buscarTarjetaCredito.fecha_Vencimiento = fecha_Vencimiento;
                    buscarTarjetaCredito.CVC = CVC;
                    buscarTarjetaCredito.correo_Electronico = correo_Electronico;

                    await buscarTarjetaCredito.save()
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

