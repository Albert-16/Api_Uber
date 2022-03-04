
const modeloUsuario = require("../Modelos/ModeloUsuarios");

const msj = require("../Componentes/mensaje");
const { validationResult } = require("express-validator");
const moment = require("moment");
const passport = require("../configuracion/passport");
const { Op } = require("sequelize");
const servicioCorreo = require("../Configuracion/servicioCorreo");

exports.validarAutenticado = passport.validarAutenticado;


exports.GenerarPin = function aleatorio(minimo, maximo) {
    try {
        return Math.round(Math.random() * (maximo - minimo) + minimo);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};

exports.RestablecerContraseña = async(req,res) =>{
    try {
        const {pin , contrasenia ,confirmarContrasenia } = req.body;
        
        const BuscarUsuario = await modeloUsuario.findOne({
            where:{
                pin: pin
            }
        });

        if(!BuscarUsuario)
        {
            msj("Error de Pin","Asegúrese que es el pin correcto que se envió a su correo",200,[],res);
        }
        else
        {
            if(contrasenia !== confirmarContrasenia)
            {
                msj("Contraseña Incorrecta","Asegúrese que la contraseña coincidan...",200,[],res);
            }
            else
            {
                await BuscarUsuario.update({ pin: null,contrasenia: contrasenia });
                msj("Restablecer Contraseña","Su contraseña se restableció correctamente",200,[],res);
            }
            
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};


exports.RecuperarCorreo = async (req, res) => {

    try {
        const { correo } = req.body;
        const pin = this.GenerarPin(1, 9999);

        const BuscarCorreo = await modeloUsuario.findOne({
            where: {
                correo: correo,
            },
        });

        if (!BuscarCorreo) {
            msj("Correo no Existente", "No se encontró el correo electrónico", 200, [], res);
        } else {

            const contenidoHtml = `     
                                    <div class="container">
                                    <h1>Recuperación de Contraseña</h1>
                                    <ul>
                                        <li>Nombre: ${BuscarCorreo.nombre}</li>
                                        <li>Correo: ${BuscarCorreo.correo}</li>
                                        <li>Teléfono: ${BuscarCorreo.telefono}</li>
                                        <li>Pin de Recuperación: ${pin}</li>
                                    </ul>
                                    <p>Nota: con este pin puede cambiar su contraseña solo una vez...</p>
                                    </div>`;
            const data = {
                nombre: BuscarCorreo.nombre + " " + BuscarCorreo.apellido,
                correo: BuscarCorreo.correo,
                telefono: BuscarCorreo.telefono,
                pin: pin,
                contenidoHtml: contenidoHtml,
                titulo: "Recuperación de Contraseña",
                mensajeConfirmacion: "Se envió el pin de recuperación a su Correo: " + BuscarCorreo.correo
            };
            servicioCorreo.sendEmail(req, res, data);

            await BuscarCorreo.update({ pin: pin });

        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};


exports.IncioSesion = async (req, res, next) => {

    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            msj("Datos Incorrectos", "Los datos ingresados no son validos", 200, validacion.array(), res);
        } else {
            const { login, contrasenia } = req.body;
            const BuscarUsuario = await modeloUsuario.findOne({
                where: {
                    [Op.or]: [
                        { "nombre_Usuario": login },
                        { "correo": login }
                    ],
                    [Op.and]: [
                        { "estado": "AC" }
                    ]
                },
            });
            if (!BuscarUsuario) {
                msj("Usuario no Encontrado", "El Usuario no existe o se encuentra inactivo", 200, [], res);
            } else {
                if (!BuscarUsuario.VerificarContrasenia(contrasenia, BuscarUsuario.contrasenia)) {
                    msj("Credenciales Incorrectas","El Usuario no existe o contraseña invalida", 200, [], res);
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
                    const infoMsj = "Bienvenido, " + DatosUsuario.Nombre + " " + DatosUsuario.Apellido;
                    msj("Menu Principal", infoMsj, 200, data, res);
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};

exports.ValidarToken = async (req, res) => {
    try {
        const { data } = req.body;
        //console.log(req);
        msj("Error de Autenticación", "¡Ocurrió un Error!,Intenta iniciar sesión de nuevo", 200, data, res);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};

exports.enviarToken = async (req, res) => {
    try {
        const { data } = req.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};
