const passport = require("passport");
const ModeloUsuarios = require("../Modelos/ModeloUsuarios");
const estrategiaJWT = require("passport-jwt").Strategy;
const extraerJWT = require("passport-jwt").ExtractJwt;
const jWT = require("jsonwebtoken");
const moment = require("moment");
const duracion = moment.duration(500, "m").asSeconds();
const clave = "MyClaveSegura";
const opciones = {};

exports.getToken = (data) => {
  return jWT.sign(data, clave, { expiresIn: duracion });
};


opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(
  new estrategiaJWT(opciones, async (payload, done) => {
    return await ModeloUsuarios.findByPk(payload.id)
      .then((data) => {
        return done(null, data.id_Usuarios);
      })
      .catch((error) => {
        return done(null, false);
      });
  })
);

exports.validarAutenticado = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/uber/user/error/",
});
