//Cargamos el modelo que creamos
const ModeloMarcas = require('../modelos/ModeloMarcas');
const { validationResult } = require('express-validator');
const msj = require("../Componentes/mensaje");

//Definición de la función
exports.listar = async (req, res) => {
    try {
        // L I S T A R -- M A R C A S
        const listaMarcas = await ModeloMarcas.findAll();
        //Validación por si los campos se encuentran vacios.
        if (listaMarcas.length == 0) //Si lista marcas está vacío o nulo.
        {
            msj("Listar las Marcas", "No existen Marcas en la base de datos", 200, [], res);
        } else { //Si lista marcas tiene datos.
            msj("Éxito", "Lista de Marcas", 200, listaMarcas, res);
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

// G U A R D A R -- M A R C A S
exports.guardar = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            console.log(validacion.array());
            res.json(validacion.array());
        } else {
            console.log(req.body);
            const {
                descripcion_Marca,
                estado_Marca,
            } = req.body;
            if (!descripcion_Marca) {
                msj("Advertencia", "Debe llenar los campos que son obligatorios", 200, [], res);
            } else {
                await ModeloMarcas.create({
                    descripcion_Marca: descripcion_Marca,
                    estado_Marca: estado_Marca,
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
// M O D I F I C A R -- M A R C A S
exports.modificar = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            console.log(validacion.array());
            res.json(validacion.array());
        } else {
            const {
                id_Marca
            } = req.query;
            const {
                estado_Marca
            } = req.body;
            if (!estado_Marca) {
                msj("Advertencia", "Debe ingresar un estado válido.", 200, [], res);
            } else {
                var buscarMarcas = await ModeloMarcas.findOne({
                    where: {
                        id_Marca: id_Marca
                    }
                });
                if (!buscarMarcas) {
                    msj("Advertencia", "El id de la marca no existe", 200, [], res)
                } else {
                    buscarMarcas.estado_Marca = estado_Marca;
                    await buscarMarcas.save()
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
// E L I M I N A R -- M A R C A S
exports.eliminar = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            console.log(validacion.array());
            res.json(validacion.array());
        } else {
            const {
                id_Marca
            } = req.query; //Siempre le enviamos el ID.
            if (!id_Marca) {
                msj("Advertencia", "Ingrese una marca existente.", 200, [], res);
            } else {
                var buscarMarcas = await ModeloMarcas.findOne({
                    where: {
                        id_Marca: id_Marca
                    }
                });
                if (!buscarMarcas) {
                    msj("Advertencia", "El id del viaje no existe", 200, [], res)
                } else {
                    buscarMarcas.estado_Marca = 0;
                    await buscarMarcas.save()
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