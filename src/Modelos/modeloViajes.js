const sequelize=require('sequelize');//Jala los datos desde la base de datos
const db= require('../configuracion/db');
const Viajes=db.define(
    "viajes",
    {
        id_Viaje:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        id_Vehiculo:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        id_Pasajeror:{
           type:sequelize.INTEGER,
           allowNull:false,          
        },
        latitud_Inicial:{
            type:sequelize.STRING(100),
            allowNull:false,
        },
        longitud_Inicial:{
            type:sequelize.STRING(100),
            allowNull:false,
        },
        longitud_Final:{
            type:sequelize.STRING(100),
            allowNull:false,
        },
        latitud_Final:{
            type:sequelize.STRING(100),
            allowNull:false,
        },
        fecha_Inicial:{
            type:sequelize.STRING(100),
            allowNull:false,
        },
        fecha_Final:{
            type:sequelize.DATE,
            allowNull:false,
        },
        fecha:{
            type:sequelize.DATE,
            allowNull:true
        },
        estado:{
            type: sequelize.ENUM('PND','FN','CNL'),
            allowNull: true,  
            defaultValue: 'FN',
        },
        direccion_Inicial:{
            type:sequelize.STRING(250),
            allowNull:false,
        },
        direccion_Final:{
            type:sequelize.STRING(250),
            allowNull:false,
        },
        id_Conductor:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        id_Tipo_Pago:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        total:{
            type:sequelize.DECIMAL(10,2),
            allowNull:false,
        },
        distancia_Km:{
            type:sequelize.DECIMAL(10,2),
            allowNull:true,
        },
    },
    //Podemos indicar algunas propiedades del objeto
    {
        tableName: "viajes",//Indicamos el nombre de la tabla
        timestamps:false,//Con esto le decimos que no necesitamos campos que son o se crean automaticamentes, campos para registrar la insercion y actualizaciones (hora y fecha)
    },
);
module.exports=Viajes;//Exportamos este modelo

