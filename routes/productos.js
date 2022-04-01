const { Router } = require('express');
const { check } = require('express-validator');
const res = require('express/lib/response');
const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();
/**
 * {{url}}/api/categorias
 */
// Obtener todas los productos - publico
router.get('/', obtenerProductos);

// Obtener una productos por id  - publico
router.get('/:id',[
  check('id', 'No es un id de Mongo Valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], obtenerProducto);

// Crear una producto  - privado con token valido
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id de Mongo Valido').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
], crearProducto);

// actualizar un producto  - privado con token valido
router.put('/:id',[
  validarJWT,
  check('id', 'No es un id de Mongo Valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], actualizarProducto);

// borrar una producto  - admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id de Mongo Valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos

], borrarProducto);


module.exports = router;