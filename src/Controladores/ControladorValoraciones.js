//Cargamos el modelo que creamos
const ModeloValoracion = require('../Modelos/ModeloValoracion');
const mensaje = ( titulo, msj, estado, data, res);

//Definicion de la función
exports.listar = async (req, res)=>{
    
    // L I S T A R -- V A L O R A C I O N E S
    const listaValoraciones = await ModeloValoracion.findAll(); // Await: es para realizar una pausa; findAll: para que busque todo los registros que hay en el modelo y que los cargue.
    
    //Validación por si los campos se encuentran vacios.
    if(listaValoraciones.length == 0) 
    {
        msj("No existen personas en la base de datos.");
    }
    else{ //Si lista personas tiene datos-
        res.json(listaPersonas); 
    }
};
exports.guardar = async (req, res)=>{ //Async significa que este realizará una pausa.
    //Variable la cual contendrá la carga del modelo
    // G U A R D A R -- P E R S O N A S
    console.log(req.body);// El ,body es porque asi lo tengo en Postman.
    const { nombre, apellido } = req.body; //Capturar los valores que tengo arriba.
    if(!nombre || !apellido){
        res.send("Debe llenar los campos que son obligatorios");
    }
    else{
        await ModeloPersona.create({
            nombre: nombre,
            apellido: apellido,
        })
        .then((data)=>{ //Podemos capturar un dato.
            console.log(data);
            res.send("El registro se almacenó correctamente.");
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al momento de guardar los datos");
        });
    }
};

 // M O D I F I C A R -- P E R S O N A S
exports.modificar = async (req, res)=>{
    const { id } = req.query;
    const { nombre, apellido, telefono, estado, imagen } = req.body;
    if(!id || !nombre || !apellido){
        res.send("Envíe los datos completos");
    }
    else{
        var buscarPersona = await ModeloPersona.findOne({
            where: {
                id: id
            }
        });
        if(!buscarPersona){
            res.send("El id no existe");
        }
        else{
            buscarPersona.nombre = nombre;
            buscarPersona.apellido = apellido;
            buscarPersona.telefono = telefono;
            buscarPersona.estado = estado;
            buscarPersona.imagen = imagen;
            await buscarPersona.save() // Colocar await siempre que se hacen peticiones a un servidor de la base de datos.
            .then((data)=>{
                console.log(data);
                res.send("El registro ha sido actualizado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al momento de modificar el registro");
            }); 
        }
    }
};

 // E L I M I N A R -- P E R S O N A S
exports.eliminar = async (req, res)=>{
    const { id } = req.query; //Siempre le enviamos el ID.
    if( !id ){
        res.send("Envíe los datos completos");
    }
    else{
        await ModeloPersona.destroy({
            where:{
                id: id
            }
        })
        .then((data)=>{
            console.log(data);
            if(data == 0){
                res.send("El id no existe.");
            }
            else{
                res.send("El registro ha sido eliminado con éxito.");
            }
        })
        .catch((error)=>{
            console.log(error);
            res.send("Error al momento de eliminar el registro.");
        });
    }
};