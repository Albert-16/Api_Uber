const ModeloVehiculosCiudad = require('../Modelos/ModeloVehiculosCiudad');
const ModeloVehiculos = require('../Modelos/ModeloVehiculos');
const ModeloCiudad = require('../Modelos/ModeloCiudad');
const con = require('../Configuracion/coneccionMysql');
const msj = require('../Componentes/mensaje');
const { validationResult } = require('express-validator');

exports.inicio = async (req, res) => {
    msj("Inicio","Estás en el Inicio de Vehículos Ciudad", 200, [], res);
};

exports.ListarRegistro = async (req, res) => {
    try {
        var ListaVehiculosByCiudad = [];
        const query = "select * from system_uber.listarvehiculosciudad;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaVehiculosByCiudad = result;
                const totalRegistros = result.length;
                if (!ListaVehiculosByCiudad) {
                    msj("Lista Vaciá", "No existen vehículos en la base de datos", 200, [], res);
                }
                else {
                    msj("Lista de Vehículos por ciudad", "Total de registros: " + totalRegistros, 200, ListaVehiculosByCiudad, res);
                }
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

exports.GuardarRegistro = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const { id_Vehiculo, id_Ciudad } = req.body;
    
            if (!id_Vehiculo || !id_Ciudad) {
                msj("Advertencia","Debe enviar los datos completos.",200,[],res);
            }
            else {

                const existVehiculo = await ModeloVehiculos.findOne({
                    where: { id_Vehiculo: id_Vehiculo }
                });

                const existCiudad = await ModeloCiudad.findOne({
                    where: { id_Ciudad: id_Ciudad }
                });

                if(!existVehiculo) {
                    msj("Advertencia","El Vehiculo no existe o no se encuentra registrado",200, [], res);
                }
                else if(!existCiudad)
                {
                    msj("Advertencia","La ciudad no existe o no se encuentra registrada",200, [], res);
                }
                else
                {
                    await ModeloVehiculosCiudad.create({
                        id_Vehiculo,id_Ciudad
                     })
                         .then((data) => {
                             msj("Registro Guardado","Registro almacenado con éxito.",200,data,res);
                         })
                         .catch((error) => {
                             msj("Error al guardar","¡Error al guardar los datos!", 200,[],res);
                             console.log(error);
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
        const { id_Vehiculo, id_Ciudad } = req.body;
        if(!validacion.isEmpty)
        {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else{
           
            if (!id_Vehiculo || !id_Ciudad) {
                msj("Advertencia","Debe enviar los datos completos.", 200, [],res);
            }
            else{
                var buscarVehiculo = await ModeloVehiculosCiudad.findOne({
                    where: {
                        id_Vehiculo : id_Vehiculo
                    }
                });
                if (!buscarVehiculo) {
                    msj("Advertencia","El id no existe o no se encuentra activo",200, [], res);
                }
                else {
                    buscarVehiculo.id_Ciudad = id_Ciudad;
    
                    await buscarVehiculo.save()
                        .then((data) => {
                          
                            msj("Registro Actualizado","¡Vehiculo modificado con éxito!",200, data, res);
                        })
                        .catch((error) => {
                            console.log(error);
                            msj("Error al actualizar","¡Error al actualizar los datos!", 200,[],res);
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


exports.EliminarRegistro = async (req, res) => {
    try {
        const validacion = validationResult(req);
        const { id_Vehiculo, id_Ciudad } = req.body;
        if(!validacion.isEmpty)
        {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else{
           
            if (!id_Vehiculo || !id_Ciudad) {
                msj("Advertencia","Debe enviar los datos completos.", 200, [],res);
            }
            else{
                var buscarVehiculo = await ModeloVehiculosCiudad.findOne({
                    where: {
                        id_Vehiculo : id_Vehiculo, id_Ciudad: id_Ciudad
                    }
                });
                if (!buscarVehiculo) {
                    msj("Advertencia","El id no existe o no se encuentra activo",200, [], res);
                }
                else {
                   
    
                    await buscarVehiculo.destroy({
                        where: { id_Ciudad: id_Ciudad , id_Vehiculo: id_Vehiculo}
                    })
                        .then((data) => {
                          
                            msj("Registro Eliminado","¡Vehiculo Eliminado con éxito!",200, data, res);
                        })
                        .catch((error) => {
                            console.log(error);
                            msj("Error al Eliminar","¡Error al Eliminado los datos!", 200,[],res);
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
