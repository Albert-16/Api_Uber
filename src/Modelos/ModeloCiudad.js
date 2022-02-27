const sequelize = require('sequelize');
const db = require('../Configuracion/db');

//Variable del modelo
const Ciudad = db.define(
    "ciudad", //Nombre interno del modelo.
    //Luego definimos los atributos que tendrá el modelo.
    {
        id_Ciudad:{ //Dentro de aqui definimos el tipo de dato llamando a sequelize
             type: sequelize.INTEGER, // Tipo de dato.
             primaryKey: true,        // Llave primaria.
             autoIncrement: true,     // Autoincremental.
             allowNull: false,        // No permita datos nulos.
        },
        descripcion_Ciudad:{
            type: sequelize.STRING(50),
            allowNull: false,  
        },
    },
    
    //Propiedades del objeto
    {
        tableName: "ciudades",  //Nombre de la tabla.
        timestamps: false,      //Campos que se crean automaticamente.
    }
);
module.exports = Ciudad;