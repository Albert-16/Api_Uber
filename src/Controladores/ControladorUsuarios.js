//Declramos la variable para utilizar el modelo
const modeloUusario = require("../Modelos/ModeloUsuarios");
const msj = require("../Componentes/mensaje");
//Metodo para obtner la lista de todos los registros de la base de datos
exports.ListarUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await modeloUusario.findAll({
            attributes: [
               ['dni','Numero de Identidad'],
               ['nombre', 'Nombre'],
               ['apellido','Apellido'],
               ['telefono','Teléfono'],
               ['correo','Correo Electrónico'],
               ['nombre_Usuario','Nombre de Usuario'],
               ['fecha_Actualizacion','Ultima Modificación']
            ]
        });
        const totalRegistros = listaUsuarios.length;
        msj("Lista de Usuarios","Total de Registros: " + totalRegistros,200,listaUsuarios,res);
     } catch (error) {
         res.status(500).json({ error: error.toString() });
     }
    
    
    //  console.log(listPersonas);
};