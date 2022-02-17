const sequelize = require('sequelize');
const db = new sequelize(
    process.env.BD,//Nombre de Base de Datos a utilizar
    process.env.USER, //Nombre de usuario del servidor a utilizar
    process.env.PASS, //contraseña del servidor a utilizar
    {
        host: process.env.HOST, //Dirección ip o nombre del host
        dialect: 'mysql', //Gestor de base de datos a utilizar
        port: process.env.PORT_MYSQL //Puerto a utilizar

    }
);

//Exportamos la configuración de nuestra base de datos
module.exports = db;