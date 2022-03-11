const { Router } = require('express');
const { check } = require('express-validator');

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { 
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosGet
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom( esRolValido),
  validarCampos
], usuariosPut);

router.post('/',[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de más de 6 letras').isLength({min:6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRolValido),
  validarCampos
], usuariosPost);

router.delete('/:id',[
  validarJWT,
  //esAdminRole,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;