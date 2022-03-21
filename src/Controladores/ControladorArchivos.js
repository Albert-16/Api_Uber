const fs = require('fs');
const path = require('path');
const msj = require('../Componentes/mensaje');
const ModeloVehiculos = require('../Modelos/ModeloVehiculos');
exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const { id_Vehiculo } = req.query;
    var BuscarVehiculo = await ModeloVehiculos.findOne({
        where: {
            id_Vehiculo: id_Vehiculo
        }
    });

    if (!BuscarVehiculo) {
        msj('Vehículos', 'El vehículo no existe', 200, [], res);
    }
    else {
        try {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../Publico/Img/Vehiculos' + 
            BuscarVehiculo.imagen));
            if(!buscarImagen){
                msj('Imágenes de vehículos', 'La imagen no existe', 200, [], res);
            }
            else{
                fs.unlinkSync(path.join(__dirname, '../Publico/Img/Vehiculos' + 
                BuscarVehiculo.imagen));
                msj('Eliminación de imágenes', 'La imagen se eliminó', 200, [], res);
                console.log('La imagen ha sido eliminada');
            }
        }
        catch (error) {
            res.status(500).json({
                error: error.toString()
            });
        }
        BuscarVehiculo.imagen = filename; 
        await BuscarVehiculo.save()
        .then((data) =>{
            msj('Imágenes guardadas', 'El archivo se almacenó con éxito.', 200, data, res);
        })
        .catch((error) =>{
            msj('Advertencia', 'Error al momento de almacenar el archivo.', 200, error, res);   
        });
    }
};