const modeloUsuario = require("../Modelos/ModeloUsuarios");
const msj = require("../Componentes/mensaje");
const modeloConductorByVehiculo = require("../Modelos/ModeloVehiculoConductor");
const modeloVehiculo = require("../Modelos/ModeloVehiculos");
const con = require("../Configuracion/coneccionMysql");
const {validationResult} = require("express-validator");

exports.ListarVehiculosByConductor = async (req, res) => {

    try {
        var ListaVehiculosByCondcutor = [];
        const query = "SELECT * FROM system_uber.listavehiculosbyconductor;";
        //Funcion para ejecutar un proceso almacenado
        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                ListaVehiculosByCondcutor = result;
                const totalRegistros = result.length;
                
                //console.log(Lista);
                msj("Lista de Vehículos por Conductor", "Total de registros: " + totalRegistros, 200, ListaVehiculosByCondcutor, res);
            });
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};



exports.GuardarVehiculoByCondcutor = async (req, res) =>{
    try {
        const validacion = validationResult(req);

        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const {id_Conductor,id_Vehiculo}= req.body;

            const ExistConductor = await modeloUsuario.findOne({
                where: {
                    id_Usuarios: id_Conductor,tipo_Usuario:"CO"
                }
            });

            const ExistVehiculo = await modeloVehiculo.findOne({
                where: {
                    id_Vehiculo: id_Vehiculo,estado:0
                }
            });
               
            if(!ExistConductor)
            {
                msj("Conductor no Existente","El conductor no se encuentra registrado...",200,[],res);
            }
            else if(!ExistVehiculo)
            {
                msj("Vehiculo no Existente","El vehículo no se encuentra registrado...",200,[],res);
            }
            else
            {
                await modeloConductorByVehiculo.create({...req.body});
                msj("Registro Guardado","El Registro se guardo con éxito",200,[],res);
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};


exports.EditarVehiculoByCondcutor = async (req, res) =>{
    try {
        const validacion = validationResult(req);

        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const {id_Conductor,id_Vehiculo}= req.body;

            const ExistConductor = await modeloUsuario.findOne({
                where: {
                    id_Usuarios: id_Conductor,tipo_Usuario:"CO"
                }
            });
               
            const ExistVehiculo = await modeloVehiculo.findOne({
                where: {
                    id_Vehiculo: id_Vehiculo,estado:0
                }
            });
            
            if(!ExistConductor)
            {
                msj("Conductor no Existente","El conductor no se encuentra registrado...",200,[],res);
            }
            else if(!ExistVehiculo)
            {
                msj("Vehiculo no Existente","El vehículo no se encuentra registrado...",200,[],res);
            }
            else
            {
                const BuscarConductor = await modeloConductorByVehiculo.findOne({
                    where: {
                        id_Conductor: id_Conductor
                    }
                });
                await BuscarConductor.update({...req.body});
                msj("Registro Guardado","El Registro se guardo con éxito",200,[],res);
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

exports.EliminarVehiculoByCondcutor = async (req, res) =>{
    try {
        const validacion = validationResult(req);

        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const {id_Conductor,id_Vehiculo}= req.body;

            const ExistConductor = await modeloUsuario.findOne({
                where: {
                    id_Usuarios: id_Conductor,tipo_Usuario:"CO"
                }
            });
               
            if(!ExistConductor)
            {
                msj("Conductor no Existente","El conductor no se encuentra registrado...",200,[],res);
            }
            else
            {
                const BuscarConductor = await modeloConductorByVehiculo.findOne({
                    where: {
                        id_Conductor: id_Conductor
                    }
                });
                await BuscarConductor.destroy({
                    where:{
                        id_Conductor: id_Conductor,
                        id_Vehiculo : id_Vehiculo
                    }
                 }).then((data) => { 
                        msj("Registro Eliminado","El Registro se Elimino con éxito",200,[],res);
                    })
                    .catch((error) => {
                      
                       msj("Error al Eliminar",error,200,[],res);
                    });
               
            }
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

