const { Router } = require("express");
const router = Router();
const msj = require("../Componentes/mensaje");

router.get("/", (req, res) => {
  var hoy = new Date();

  var fecha = hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  var fechaYHora = fecha + ' ' + hora;
  const Data = {
    Aviso: "Buenos Dias",
    "Fecha y Hora": fechaYHora,
  };
  msj(
    "Pagina Principal",
    "Bienvenido a nuestro Servicio de Uber",
    200,
    Data,
    res
  );
});

module.exports = router;
