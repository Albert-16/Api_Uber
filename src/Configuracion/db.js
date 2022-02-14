const sequelize = require('sequelize');
const db = new sequelize(
    'system_uber',//Nombre de Base de Datos a utilizar
    'root', //Nombre de usuario del servidor a utilizar
    'luis1234', //contraseña del servidor a utilizar
    {
        host: 'localhost', //Direccion ip o nombre del host
        dialect: 'mysql', //Gestor de base dedatos a utilizar
        port: '3306' //Puerto a utilizar

    }
);

//Exportamos la configuracion de nuestra base de datos
module.exports = db;