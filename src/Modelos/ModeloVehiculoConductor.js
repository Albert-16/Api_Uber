//Declaracion para utilizar el paquete sequelize
const sequelize = require("sequelize");
//Guardamos la configuracion de nuestra base de datos
const db = require("../Configuracion/db");

//declaramos el modelo especificando cada campo con su longitud y si permite null de la tabla
//especificamente de personas
const VehiculosConductor = db.define(
  "vehiculos_conductor",
  {
      id_Conductor: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    id_Vehiculo: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },

  },
  {
    tableName: "vehiculos_conductor",
    timestamps: false,
    hasOne: true,
  }
);




//Exportamos el modulo de personas
module.exports = VehiculosConductor;