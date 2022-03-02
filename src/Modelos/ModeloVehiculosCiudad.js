//Requerimos a sequelize
const sequelize = require('sequelize');
//Instanciamos nuestra configuracion de Base de datos
const db = require('../Configuracion/db');
//Definimos el modelo Vehiculos con sus atributos.
const Vehiculos = db.define(
    "vehiculos_ciudad",
    {
        //Declaramos la informacion de cada atributo de la tabla
            id_Vehiculo:{
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id_Ciudad:{
                type: sequelize.INTEGER,
                allowNull: false,
            },     

        },
    {
        //Nombre de la tabla utilizada en el modelo
        tableName:"vehiculos_ciudad",
        //campos que se crean automaticos para registrar hora y fecha los desactivamos.
        timestamps: false,
    },
);
module.exports = Vehiculos;