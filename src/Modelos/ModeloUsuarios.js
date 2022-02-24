//Declaracion para utilizar el paquete sequelize
const sequelize = require("sequelize");
//Guardamos la configuracion de nuestra base de datos
const db = require("../Configuracion/db");
//Paqute para encriptamiento de contraseña
const bcrypt = require("bcrypt");
//declaramos el modelo especificando cada campo con su longitud y si permite null de la tabla
//especificamente de personas
const Usuarios = db.define(
  "Usuario",
  {
    id_Usuarios: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dni: {
      type: sequelize.STRING(13),
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    apellido: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    telefono: {
      type: sequelize.STRING(20),
      allowNull: false,
    },
    correo: {
      type: sequelize.STRING(75),
      allowNull: false,
    },
    nombre_Usuario: {
      type: sequelize.STRING(50),
      allowNull: false,
    },
    contrasenia: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    tipo_Usuario: {
      type: sequelize.ENUM("CL", "CO"),
      allowNull: false,
      defaultValue: "CL",
    },
    estado: {
      type: sequelize.ENUM("AC", "IN"),
      allowNull: false,
      defaultValue: "AC",
    },
    pin: {
      type: sequelize.STRING(4),
      allowNull: true
    },
    fecha_Registro: {
      type: sequelize.DATE,
      allowNull: true
    },
    fecha_Actualizacion: {
      type: sequelize.DATE,
      allowNull: true
    }
  },
  {
    tableName: "usuarios",
    timestamps: false,
    hooks: {
      beforeCreate(Usuario) {
        const hash = bcrypt.hashSync(Usuario.contrasenia, 10);
        Usuario.contrasenia = hash;
      },
      beforeUpdate(Usuario) {
        const hash = bcrypt.hashSync(Usuario.contrasenia, 10);
        Usuario.contrasenia = hash;
      },
    },
  }
);


Usuarios.prototype.VerificarContrasenia = (con, com) => {
  return bcrypt.compareSync(con, com);
};

//Exportamos el modulo de personas
module.exports = Usuarios;