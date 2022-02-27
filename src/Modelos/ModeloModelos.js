const sequelize=require('sequelize');//Jala los datos desde la base de datos
const db= require('../configuracion/db');
const Modelos=db.define(
    "modelos",
    {
        id_Modelo:{
            type:sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        descripcion_Modelo:{
            type:sequelize.STRING(60),
            allowNull:false,
        },
        estado_Modelo:{
           type:sequelize.TINYINT,
           defaultValue:1,
           allowNull:false,          
        },
        id_Marca:{
            type:sequelize.INTEGER,
            allowNull:false,
        }
    },
    //Podemos indicar algunas propiedades del objeto
    {
        tableName: "modelos",//Indicamos el nombre de la tabla
        timestamps:false,//Con esto le decimos que no necesitamos campos que son o se crean automaticamentes, campos para registrar la insercion y actualizaciones (hora y fecha)
    },
);
module.exports=Modelos;//Exportamos este modelo