//Cargamos el modelo que creamos
const ModeloMarcas = require('../modelos/ModeloMarcas');
const { validationResult } = require('express-validator');
const msj = require("../Componentes/mensaje");
const con = require('../Configuracion/coneccionMysql');

//Definición de la función
exports.listar = async (req, res) => {
    try {
        var ListaMarcas = [];
        const query = "select id_Marca as '#ID', descripcion_Marca as Marca , case when estado_Marca = 1 then 'Activo' else 'Inactivo' end Estado from marcas;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaMarcas = result;
                const totalRegistros = result.length;
                if (!ListaMarcas) {
                    msj("Lista Vaciá", "No existen Marcas en la base de datos", 200, [], res);
                }
                else {
                    msj("Lista de Marcas", "Total de registros: " + totalRegistros, 200, ListaMarcas, res);
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
        var ListaMarcas = [];
        const query = "select id_Marca as value, descripcion_Marca as label from marcas;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaMarcas = result;
                const totalRegistros = result.length;
                if (!ListaMarcas) {
                    msj("Lista Vaciá", "No existen Modelos en la base de datos", 200, [], res);
                }
                else {
                   res.json(ListaMarcas);
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
}


// G U A R D A R -- M A R C A S
exports.guardar = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        } else {
            console.log(req.body);
            const {
                descripcion_Marca,
                estado_Marca
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
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        } else {
            const {
                id_Marca
            } = req.query;
            const {
                descripcion_Marca,
                estado_Marca
            } = req.body;
            if (estado_Marca == null) {
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
                    buscarMarcas.descripcion_Marca= descripcion_Marca;
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