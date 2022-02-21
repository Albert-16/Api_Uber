//Cargamos el modelo que creamos
const ModeloViaje = require('../modelos/modeloViajes');
const msj = require("../Componentes/mensaje");

//Definición de la función
exports.listar = async (req, res)=>{ 

    // L I S T A R -- V I A J E S
    const listaViajes = await ModeloViaje.findAll(); 
    
    //Validación por si los campos se encuentran vacios.
    if(listaViajes.length == 0) //Si lista viajes está vacío o nulo.
    {
        msj("Listar los viajes", "No existen viajes en la base de datos", 200, [], res);
    }
    else{ //Si lista viajes tiene datos.
        msj("Éxito","Lista de viajes", 200, listaViajes, res); 
    }
};

 // G U A R D A R -- V I A J E S
exports.guardar = async (req, res)=>{ 
   
    console.log(req.body);
    const { latitud_Inicial, longitud_Inicial, longitud_Final, latitud_Final, fecha_Inicial, fecha_Final,  fecha, direccion_Inicial, direccion_Final, total} = req.body; 
    if(!latitud_Inicial || !longitud_Inicial || !longitud_Final || !latitud_Final || !fecha_Inicial || !fecha_Final || !fecha 
        || !direccion_Inicial || !direccion_Final || !total){
        msj("Advertencia","Debe llenar los campos que son obligatorios", 200, [], res);
    }
    else{
        await ModeloViaje.create({
            latitud_Inicial: latitud_Inicial,
            longitud_Inicial: longitud_Inicial,
            longitud_Final: longitud_Final,
            latitud_Final: latitud_Final,
            fecha_Inicial: fecha_Inicial,
            fecha_Final: fecha_Final,
            fecha: fecha,
            direccion_Inicial: direccion_Inicial,
            direccion_Final: direccion_Final,
            total: total
        })
        .then((data)=>{ 
            console.log(data);
            msj("Éxito", "El registro se almacenó correctamente.", 200, [], res);
        })
        .catch((error)=>{
            console.log(error);
            msj("Error", "Error al momento de guardar los datos.", 200, [], res);
        });
    }
};