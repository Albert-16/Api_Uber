//Cargamos el modelo que creamos
const ModeloValoracion = require('../Modelos/ModeloValoracion');
const msj = require('../Componentes/mensaje');

//Definicion de la función
// L I S T A R -- V A L O R A C I O N E S
exports.listar = async (req, res) => {
    try {
        const listaValoraciones = await ModeloValoracion.findAll();

        //Validación por si los campos se encuentran vacios.
        if (listaValoraciones.length == 0) {
            msj("Advertencia", "No existen valoraciones en la base de datos.", 200, [], res);
        }
        else {
            msj("Éxito", "Lista de valoraciones", 200, listaValoraciones, res);
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

// G U A R D A R -- V A L O R A C I O N E S
exports.guardar = async (req, res) => {
    try {
        console.log(req.body);
        const { cantidad_estrellas, id_Viaje } = req.body;
        if (!cantidad_estrellas || !id_Viaje) {
            msj("Advertencia", "Debe llenar los campos que son obligatorios", 200, [], res);
        }
        else {
            if (cantidad_estrellas >= 6) {
                msj("Advertencia", "La cantidad de estrellas no puede ser mayor a '5'.", 200, [], res)
            }
            if (cantidad_estrellas <= 0) {
                msj("Advertencia", "La cantidad de estrellas no puede ser menor o igual a 0.", 200, [], res);
            } else {
                await ModeloValoracion.create({
                    cantidad_estrellas: cantidad_estrellas,
                    id_Viaje: id_Viaje,
                })
                    .then((data) => {
                        msj("Éxito", "El registro se almacenó correctamente.", 200, data, res);
                    })
                    .catch((error) => {
                        msj("Error", "Error al momento de guardar los datos", 200, error, res);
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

// M O D I F I C A R -- V A L O R A C I O N E S
exports.modificar = async (req, res) => {
    try {
        const { id_Valoracion } = req.query;
        const { cantidad_estrellas } = req.body;
        if (!id_Valoracion || !cantidad_estrellas) {
            msj("Advertencia", "Debe enviar los datos completos", 200, [], res);
        }
        else {
            var buscarValoracion = await ModeloValoracion.findOne({
                where: {
                    id_Valoracion: id_Valoracion
                }
            });
            if (!buscarValoracion) {
                msj("Advertencia", "El id de la valoración no existe.", 200, [], res);
            }
            else {
                if (cantidad_estrellas >= 6) {
                    msj("Advertencia", "La cantidad de estrellas no puede ser mayor a 5.", 200, [], res);
                }
                if (cantidad_estrellas <= 0) {
                    msj("Advertencia", "La cantidad de estrellas no puede ser menor o igual a 0.", 200, [], res);
                } else {
                    buscarValoracion.cantidad_estrellas = cantidad_estrellas;
                    await buscarValoracion.save()
                        .then((data) => {
                            msj("Éxito", "El registro ha sido actualizado", 200, data, res);
                        })
                        .catch((error) => {
                            msj("Error", "Error al momento de modificar el registro", 200, error, res);
                        });
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

// E L I M I N A R -- V A L O R A C I O N E S
exports.eliminar = async (req, res) => {
    try {
        const { id_Valoracion } = req.query; //Siempre le enviamos el ID.
        if (!id_Valoracion) {
            msj("Advertencia", "Envíe los datos completos", 200, [], res);
        }
        else {
            await ModeloValoracion.destroy({
                where: {
                    id_Valoracion: id_Valoracion
                }
            })
                .then((data) => {
                    console.log(data);
                    if (data == 0) {
                        msj("Advertencia", "El id de la valoración no existe.", 200, [], res);
                    }
                    else {
                        msj("Éxito", "El registro ha sido eliminado", 200, data, res);
                    }
                })
                .catch((error) => {
                    msj("Error", "Error al momento de eliminar el registro", 200, error, res);
                });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};