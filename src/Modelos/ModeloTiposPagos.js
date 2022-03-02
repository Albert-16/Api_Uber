//Requerimos a sequelize
const sequelize = require('sequelize');
//Instanciamos nuestra configuracion de Base de datos
const db = require('../Configuracion/db');
//Definimos el modelo Vehiculos con sus atributos.
const TiposDePagos = db.define(
    "tipos_de_pago",
    {
        //Declaramos la informacion de cada atributo de la tabla
            id_Tipos_Pago:{
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            descripcion_Pago:{
                type: sequelize.STRING(45),
                allowNull: false,
            },     

        },
    {
        //Nombre de la tabla utilizada en el modelo
        tableName:"tipos_de_pago",
        //campos que se crean automaticos para registrar hora y fecha los desactivamos.
        timestamps: false,
    },
);
module.exports = TiposDePagos;