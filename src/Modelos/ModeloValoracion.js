const sequelize = require('sequelize');
const db = require('../Configuracion/db');

//Variable del modelo
const Valoracion = db.define(
    "valoracion", //Nombre interno del modelo.
    //Luego definimos los atributos que tendrá el modelo.
    {
        id_Valoracion:{ //Dentro de aqui definimos el tipo de dato llamando a sequelize
             type: sequelize.INTEGER, // Tipo de dato.
             primaryKey: true,        // Llave primaria.
             autoIncrement: true,     // Autoincremental.
             allowNull: false,        // No permita datos nulos.
        },
        cantidad_estrellas:{
            type: sequelize.INTEGER,
            allowNull: false,  
        },
        id_Viaje:{
            type: sequelize.INTEGER,
            allowNull: false,  
        },
    },
    
    //Propiedades del objeto
    {
        tableName: "valoracion",  //Nombre de la tabla.
        timestamps: false,      //Campos que se crean automaticamente.
    }
);
module.exports = Valoracion;