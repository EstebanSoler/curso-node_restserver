const { Router } = require('express');
const { check } = require('express-validator');
const res = require('express/lib/response');
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();
/**
 * {{url}}/api/categorias
 */
// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categorias por id  - publico
router.get('/:id',[
  check('id', 'No es un id de Mongo Valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria);

// Crear una categorias  - privado con token valido
router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria);

// actualizar una categorias  - privado con token valido
router.put('/:id',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], actualizarCategoria);

// borrar una categorias  - admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id de Mongo Valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos

], borrarCategoria);


module.exports = router;