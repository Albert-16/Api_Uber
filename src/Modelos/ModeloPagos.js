//Requerimos a sequelize
const sequelize = require('sequelize');
//Instanciamos nuestra configuracion de Base de datos
const db = require('../Configuracion/db');
//Definimos el modelo Vehiculos con sus atributos.
const TarjetasCredito = db.define(
    "tarjetas_credito",
    {
        //Declaramos la informacion de cada atributo de la tabla
            idTarjeta_Credito:{
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            titular_Tarjeta:{
                type: sequelize.STRING(45),
                allowNull: false,
            }, 
            numeroTarjeta:{
                type: sequelize.STRING(16),
                allowNull: false,
            },    
            fecha_Vencimiento:{
                type: sequelize.STRING(4),
                allowNull: false,
            },
            CVC:{
                type: sequelize.STRING(4),
                allowNull: false,
            },
            correo_Electronico:{
                type: sequelize.STRING(45),
                allowNull: false,
            },
            estado:{
                type: sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            id_Usuarios:{
                type: sequelize.INTEGER,
                allowNull: false,
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
        tableName:"tarjetas_credito",
        //campos que se crean automaticos para registrar hora y fecha los desactivamos.
        timestamps: false,
    },
);
module.exports = TarjetasCredito;