
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

    const contenidoHtml = `     
    <div class="container">
    <h1>Recuperación de Contraseña</h1>
    <ul>
        <li>Nombre: ${data.nombre}</li>
        <li>Correo: ${data.correo}</li>
        <li>Teléfono: ${data.telefono}</li>
        <li>Pin de Recuperación: ${data.pin}</li>
    </ul>
    <p>Nota: con este pin puede cambiar su contraseña solo una vez...</p>
    </div>`;
    // Definimos el email
    var mailOptions = {
        from: process.env.correo_app,
        to: data.correo,
        subject: 'Recuperación de Contraseña',
        html: contenidoHtml
    };
    // Enviamos el email
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            msj("Error de Envió",error.message,200,[],res);
        } else {
            msj("Envió Exitoso","Se envió el pin de recuperación a su Correo: " + data.correo,200,[],res);
        }
    });
};
