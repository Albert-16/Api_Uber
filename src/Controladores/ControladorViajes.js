//Cargamos el modelo que creamos
const ModeloViaje = require('../modelos/modeloViajes');

//Definición de la función
exports.listar = async (req, res)=>{ 

    // L I S T A R -- V I A J E S
    const listaViajes = await ModeloViaje.findAll(); 
    
    //Validación por si los campos se encuentran vacios.
    if(listaViajes.length == 0) //Si lista viajes está vacío o nulo.
    {
        res.send("No existen viajes en la base de datos.");
    }
    else{ //Si lista viajes tiene datos.
        res.json(listaViajes); 
    }
};

 // G U A R D A R -- V I A J E S
exports.guardar = async (req, res)=>{ 
   
    console.log(req.body);
    const { latitud_Inicial, longitud_Inicial, longitud_Final, latitud_Final, fecha_Inicial, fecha_Final,  fecha, direccion_Inicial, direccion_Final, total, distancia_Km} = req.body; 
    if(!latitud_Inicial || !longitud_Inicial || !longitud_Final || !latitud_Final || !fecha_Inicial || !fecha_Final || !fecha 
        || !direccion_Inicial || !direccion_Final || !total || !distancia_Km){
        res.send("Debe llenar los campos que son obligatorios");
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
            total: total,
            distancia_Km: distancia_Km
        })
        .then((data)=>{ 
            console.log(data);
            res.send("El registro se almacenó correctamente.");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al momento de guardar los datos");
        });
    }
};