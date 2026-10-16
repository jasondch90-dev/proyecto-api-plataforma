const express = require('express');
const router = express.Router();
const { validarUsuario } = require('../middlewares/validaciones');
const { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios.controller');

router.post('/', validarUsuario, crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;