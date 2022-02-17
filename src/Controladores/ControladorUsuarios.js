//Declramos la variable para utilizar el modelo
const modeloUusario = require("../Modelos/ModeloUsuarios");
const msj = require("../Componentes/mensaje");
const { validationResult } = require("express-validator");

//Metodo para obtner la lista de todos los registros de la base de datos
exports.ListarUsuarios = async (req, res) => {
    try {
        console.log(process.env.BD);
        const listaUsuarios = await modeloUusario.findAll({
            attributes: [
                ['dni', 'Numero de Identidad'],//['Campo de la tabla','Alias']
                ['nombre', 'Nombre'],
                ['apellido', 'Apellido'],
                ['telefono', 'Teléfono'],
                ['correo', 'Correo Electrónico'],
                ['nombre_Usuario', 'Nombre de Usuario'],
                ['fecha_Actualizacion', 'Ultima Modificación']
            ]
        });
        const totalRegistros = listaUsuarios.length;
        msj("Lista de Usuarios", "Total de Registros: " + totalRegistros, 200, listaUsuarios, res);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

exports.GuardarUsuarios = async (req, res) => {
    try {
        const validacion = validationResult(req);

        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const {
                dni,
                nombre,
                apellido
            } = req.body;


            const existUser = await modeloUusario.findOne({
                where: {
                    dni: dni
                }
            });
            if (existUser) {
                msj("Usuario Existente", "El usuario con Identidad: " + dni + " ya existe...", 200, [], res);
            }
            else {
                await modeloUusario.create({ ...req.body });
                const infoMsj = "El usuario: " + nombre + " " + apellido + " se registro con éxito";
                msj("Usuario Registrado", infoMsj, 200, [], res);
            }

        }


    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

exports.EditarUsuario = async (req, res) => {
    try {

        const validacion = validationResult(req);

        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const { nombre, apellido } = req.body;
            const { id } = req.query;

            const existUser = await modeloUusario.findByPk(id);
            if (!existUser) {
                msj("Usuario no existente", "El usuario con id: " + id + " no existe...", 200, [], res);
            }
            else {
                await existUser.update({ ...req.body });
                const infoMsj = "El usuario: " + nombre + " " + apellido + " se actualizaron sus datos con éxito";
                msj("Usuario Modificado", infoMsj, 200, [], res);
            }

        }

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

exports.EliminarUsuario = async (req, res) => {
    try {
        const { id } = req.query;
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Erroneos", "Los datos enviados no son correctos", 200, validacion.array(), res);
        }
        else {
            const existUser = await modeloUusario.findByPk(id);
            if (!existUser) {
                msj("Usuario no existente", "El usuario con id: " + id + " no existe...", 200, [], res);
            }
            else {
                await existUser.update({ "estado": "IN" });
                const infoMsj = "El usuario: " + existUser.nombre + " " + existUser.apellido + " se Eliminaron sus datos con éxito";
                msj("Usuario Eliminado", infoMsj, 200, [], res);
            }

        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}