
const msj = require('../Componentes/mensaje');
const nodemailer = require('nodemailer');



exports.sendEmail = async function (req, res,data) {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:  process.env.correo_app,
            pass:  process.env.correo_contrasenia
        }
    });

    
    // Definimos el email
    var mailOptions = {
        from: process.env.correo_app,
        to: data.correo,
        subject: data.titulo,
        html: data.contenidoHtml
    };
    // Enviamos el email
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            msj("Error de Envió",error.message,200,[],res);
        } else {

            msj("Envió Exitoso",data.mensajeConfirmacion,200,[],res);
        }
    });
};
