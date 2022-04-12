const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const ValidarRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archvio');

module.exports = {
  ...validarCampos,
  ... validarJWT,
  ...ValidarRoles,
  ...validarArchivoSubir,
}