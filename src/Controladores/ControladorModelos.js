//Cargamos el modelo que creamos
const ModeloModelos = require('../modelos/ModeloModelos');
const msj = require("../Componentes/mensaje");

//Definición de la función
exports.listar = async (req, res) => {
    try {
        // L I S T A R -- M A R C A S
        const listaModelos = await ModeloModelos.findAll();
        //Validación por si los campos se encuentran vacios.
        if (listaModelos.length == 0) //Si lista marcas está vacío o nulo.
        {
            msj("Listar las Marcas", "No existen Marcas en la base de datos", 200, [], res);
        } else { //Si lista marcas tiene datos.
            msj("Éxito", "Lista de Marcas", 200, listaModelos, res);
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
        console.log(req.body);
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
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};
// M O D I F I C A R -- M A R C A S
exports.modificar = async (req, res) => {
    try {
        const {
            id_Modelo
        } = req.query;
        const {
            estado_Modelo
        } = req.body;
        if (!estado_Modelo) {
            msj("Advertencia", "Debe ingresar un estado válido.", 200, [], res);
        } else {
            var buscarModelo = await ModeloModelos.findOne({
                where: {
                    id_Modelo: id_Modelo
                }
            });
            if (!buscarModelo) {
                msj("Advertencia", "El id de la marca no existe", 200, [], res)
            } else {
                buscarModelo.estado_Modelo = estado_Modelo;
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
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};
// E L I M I N A R -- M A R C A S
exports.eliminar = async (req, res) => {
    try {
        const {
            id_Modelo
        } = req.query; //Siempre le enviamos el ID.
        if (!id_Modelo) {
            msj("Advertencia", "Ingrese una marca existente.", 200, [], res);
        } else {
            var buscarModelo = await ModeloModelos.findOne({
                where: {
                    id_Marca: id_Modelo
                }
            });
            if (!buscarModelo) {
                msj("Advertencia", "El id del viaje no existe", 200, [], res)
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
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};