const express = require('express');
const router = express.Router();
const { validarPelicula } = require('../middlewares/validaciones');
const { 
    crearPelicula, 
    obtenerPeliculas, 
    obtenerPeliculaPorId, 
    actualizarPelicula, 
    eliminarPelicula 
} = require('../controllers/peliculas.controller');

router.post('/', validarPelicula, crearPelicula);
router.get('/', obtenerPeliculas);
router.get('/:id', obtenerPeliculaPorId);
router.put('/:id', actualizarPelicula);
router.delete('/:id', eliminarPelicula);

module.exports = router;