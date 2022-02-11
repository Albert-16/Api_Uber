const mensaje = ( titulo,msj, estado, data, res) =>{
    var aviso={
        Titulo: titulo,
        Mensaje: msj,
        Información: data
    };
    res.setHeader("Content-Type", "application/json");
    res.statusCode=estado;
    console.log(msj);
    res.json(aviso);
};
module.exports = mensaje;