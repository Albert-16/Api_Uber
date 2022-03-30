//Cargamos el modelo que creamos
const ModeloCiudad = require('../Modelos/ModeloCiudad');
const msj = require('../Componentes/mensaje');
const con = require('../Configuracion/coneccionMysql');
//Definicion de la función
// L I S T A R -- C I U D A D E S 
exports.listar = async (req, res) => {
    try {
        const listaCiudades = await ModeloCiudad.findAll({
            attributes:[
                ['id_Ciudad','#ID'],
                ['descripcion_Ciudad','Ciudad']
            ]
        });

        //Validación por si los campos se encuentran vacios.
        if (listaCiudades.length == 0) {
            msj("Advertencia", "No existen ciudades en la base de datos.", 200, [], res);
        }
        else {
            msj("Éxito", "Lista de Ciudades", 200, listaCiudades, res);
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

exports.getDatos = async (req,res) =>{
    try {
        var Lista = [];
        const query = "SELECT id_Ciudad as value , descripcion_Ciudad as label FROM system_uber.ciudades;";
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

// G U A R D A R -- C I U D A D E S 
exports.guardar = async (req, res) => {
    try {
        console.log(req.body);
        const { descripcion_Ciudad } = req.body;
        if (!descripcion_Ciudad) {
            msj("Advertencia", "Debe llenar los campos que son obligatorios", 200, [], res);
        }
        else {

            const ExistCiudad = await ModeloCiudad.findOne({ 
                where: { 
                    descripcion_Ciudad: descripcion_Ciudad
                }
            });

            if(ExistCiudad) {
                msj("Ciudad existente", "La ciudad ya se encuentra registrada.", 200, [], res);
            }
            else
            {
                await ModeloCiudad.create({
                    descripcion_Ciudad: descripcion_Ciudad,
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

// M O D I F I C A R -- C I U D A D E S 
exports.modificar = async (req, res) => {
    try {
        const { id_Ciudad } = req.query;
        const { descripcion_Ciudad } = req.body;
        if (!id_Ciudad || !descripcion_Ciudad) {
            msj("Advertencia", "Debe enviar los datos completos", 200, [], res);
        }
        else {
            var buscarCiudad = await ModeloCiudad.findOne({
                where: {
                    id_Ciudad: id_Ciudad
                }
            });
            if (!buscarCiudad) {
                msj("Advertencia", "El id de la ciudad no existe.", 200, [], res);
            }
            else {
                buscarCiudad.descripcion_Ciudad = descripcion_Ciudad;
                await buscarCiudad.save()
                    .then((data) => {
                        msj("Éxito", "El registro ha sido actualizado", 200, data, res);
                    })
                    .catch((error) => {
                        msj("Error", "Error al momento de modificar el registro", 200, error, res);
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

// E L I M I N A R -- C I U D A D E S 
exports.eliminar = async (req, res) => {
    try {
        const { id_Ciudad } = req.query; //Siempre le enviamos el ID.
        if (!id_Ciudad) {
            msj("Advertencia", "Envíe los datos completos", 200, [], res);
        }
        else {
            await ModeloCiudad.destroy({
                where: {
                    id_Ciudad: id_Ciudad
                }
            })
                .then((data) => {
                    console.log(data);
                    if (data == 0) {
                        msj("Advertencia", "El id de la ciudad no existe.", 200, [], res);
                    }
                    else {
                        msj("Éxito", "El registro ha sido eliminado", 200, [], res);
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