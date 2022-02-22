
const modeloUsuario = require("../Modelos/ModeloUsuarios");

const msj = require("../Componentes/mensaje");
const { validationResult } = require("express-validator");
const moment = require("moment");
const passport = require("../configuracion/passport");
const { Op } = require("sequelize");
const servicioCorreo = require("../Configuracion/servicioCorreo");

exports.validarAutenticado = passport.validarAutenticado;


exports.GenerarPin = function aleatorio(minimo,maximo){
    return Math.round(Math.random() * (maximo - minimo) + minimo);
}

exports.RecuperarCorreo = async (req, res) => {
    const { correo } = req.body;
    const pin = this.GenerarPin(1,9999);
    
    const BuscarCorreo = await modeloUsuario.findOne({
        where: {
            correo: correo,
        },
    });

    if (!BuscarCorreo) {
        msj("Correo no Existente","No se encontró el correo electrónico", 200, [], res);
    } else {
        const data = {
            nombre: BuscarCorreo.nombre + " " + BuscarCorreo.apellido,
            correo: BuscarCorreo.correo,
            telefono: BuscarCorreo.telefono,
            pin: pin,
        };
        servicioCorreo.sendEmail(req,res,data);
    }
};


exports.IncioSesion = async (req, res, next) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Datos Incorrectos","Los datos ingresados no son validos", 200, validacion.array(), res);
    } else {
        const { login, contrasenia } = req.body;
        const BuscarUsuario = await modeloUsuario.findOne({
            where: {
                [Op.or]:[
                    {"nombre_Usuario": login},
                    {"correo": login}
                ],
                [Op.and]:[
                    {"estado": "AC"}
                ]
            },
        });
        if (!BuscarUsuario) {
            msj("Usuario no Encontrado","El Usuario no existe o se encuentra inactivo", 200, [], res);
        } else {
            if (!BuscarUsuario.VerificarContrasenia(contrasenia,BuscarUsuario.contrasenia)) {
                msj("El Usuario no existe o contraseña invalida", 200, [], res);
            } else {
                const DatosUsuario = {
                    Usuario: BuscarUsuario.nombre_Usuario,
                    Nombre: BuscarUsuario.nombre,
                    Apellido: BuscarUsuario.apellido,
                    "Correo Electrónico": BuscarUsuario.correo,
                };
                const token = passport.getToken({ id: BuscarUsuario.id_Usuarios });
                const data = {
                    token: token,
                    Usuario: DatosUsuario,
                };
                console.log(data);
                const infoMsj =  "Bienvenido, " + DatosUsuario.Nombre + " " + DatosUsuario.Apellido;
                msj("Menu Principal",infoMsj,200,data,res);
            }
        }
    }
};

exports.ValidarToken = async (req, res) => {
    const { data } = req.body;
    //console.log(req);
    msj("Error de Autenticación","¡Ocurrió un Error!,Intenta iniciar sesión de nuevo", 200, data, res);
};
exports.enviarToken = async (req, res) => {
    const { data } = req.body;
    res.status(200).json(data);
};
