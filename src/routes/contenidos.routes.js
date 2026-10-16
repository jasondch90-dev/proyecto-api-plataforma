const express = require('express');
const router = express.Router();
const { validarContenido } = require('../middlewares/validaciones');
const { 
    crearContenido, 
    obtenerContenidos, 
    obtenerContenidoPorId, 
    actualizarContenido, 
    eliminarContenido 
} = require('../controllers/contenidos.controller');

router.post('/', validarContenido, crearContenido);
router.get('/', obtenerContenidos);
router.get('/:id', obtenerContenidoPorId);
router.put('/:id', actualizarContenido);
router.delete('/:id', eliminarContenido);

module.exports = router;