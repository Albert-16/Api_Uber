//Cargamos el modelo que creamos
const ModeloModelos = require('../modelos/ModeloModelos');
const { validationResult } = require('express-validator');
const msj = require("../Componentes/mensaje");
const con = require('../Configuracion/coneccionMysql');
//Definición de la función
exports.listar = async (req, res) => {
    try {
        var ListaModelos = [];
        const query = "select * from listamodelos;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaModelos = result;
                const totalRegistros = result.length;
                if (!ListaModelos) {
                    msj("Lista Vaciá", "No existen Modelos en la base de datos", 200, [], res);
                }
                else {
                    msj("Lista de Modelos", "Total de registros: " + totalRegistros, 200, ListaModelos, res);
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
        const query = "select id_Modelo as value, descripcion_Modelo as label from modelos where estado_Modelo = 1;";
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


// G U A R D A R -- M A R C A S
exports.guardar = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        } else {
         
            const {
                descripcion_Modelo,
                estado_Modelo,
                id_Marca,
            } = req.body;
            if (!descripcion_Modelo || !id_Marca) {
                msj("Advertencia", "Debe llenar los campos que son obligatorios", 200, [], res);
            } else {
                await ModeloModelos.create({
                    descripcion_Modelo: descripcion_Modelo,
                    estado_Modelo: estado_Modelo,
                    id_Marca: id_Marca,
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
                id_Modelo
            } = req.query;
            const {
                descripcion_Modelo,
                estado_Modelo,
                id_Marca,
            } = req.body;
           
            if (estado_Modelo == null) {
                msj("Advertencia", "Debe ingresar un estado válido.", 200, [], res);
            } 
            else {
                var buscarModelo = await ModeloModelos.findOne({
                    where: {
                        id_Modelo: id_Modelo
                    }
                });
                if (!buscarModelo) {
                    msj("Advertencia", "El id del modelo no existe", 200, [], res)
                } else {
                    buscarModelo.estado_Modelo = estado_Modelo;
                    buscarModelo.descripcion_Modelo = descripcion_Modelo;
                    buscarModelo.id_Marca = id_Marca;
                    await buscarModelo.save()
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
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        } else {
            const {
                id_Modelo
            } = req.query; //Siempre le enviamos el ID.
            if (!id_Modelo) {
                msj("Advertencia", "Ingrese un modelo existente.", 200, [], res);
            } else {
                var buscarModelo = await ModeloModelos.findOne({
                    where: {
                        id_Modelo: id_Modelo
                    }
                });
                if (!buscarModelo) {
                    msj("Advertencia", "El id del modelo no existe", 200, [], res)
                } else {
                    buscarModelo.estado_Modelo = 0;
                    await buscarModelo.save()
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