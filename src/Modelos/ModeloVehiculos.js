//Requerimos a sequelize
const sequelize = require('sequelize');
//Instanciamos nuestra configuracion de Base de datos
const db = require('../Configuracion/db');
//Definimos el modelo Vehiculos con sus atributos.
const Vehiculos = db.define(
    "vehiculos",
    {
        //Declaramos la informacion de cada atributo de la tabla
            id:{
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },    
            placa:{ 
                type: sequelize.STRING(45),
                allowNull: false,
            },
            modelo:{
                type: sequelize.STRING(45),
                allowNull: false,
            },
            anio:{
                type: sequelize.INTEGER,
                allowNull: false,
            },
            color:{
                type: sequelize.STRING(45),
                allowNull: false,
            },
            marca:{
                type: sequelize.STRING(45),
                allowNull: true,
                defaultValue: true,
            },
            estado:{
                type: sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            fecha_Registro:{
                type: sequelize.DATE,
                allowNull: true,
            },
            fecha_Actualizacion:{
                type: sequelize.DATE,
                allowNull: true,
            }

        },
    {
        //Nombre de la tabla utilizada en el modelo
        tableName:"vehiculos",
        //campos que se crean automaticos para registrar hora y fecha los desactivamos.
        timestamps: false,
    },
);
module.exports = Vehiculos;