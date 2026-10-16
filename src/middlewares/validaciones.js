const { body, validationResult } = require('express-validator');

// Validaciones para Usuarios
const validarUsuario = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Error en los datos enviados',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validaciones para Contenidos (Plataformas Online)
const validarContenido = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('descripcion').isLength({ min: 10 }).withMessage('La descripción debe tener mínimo 10 caracteres'),
  body('artista').notEmpty().withMessage('El artista es obligatorio'),
  body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
  body('urlVideo').isURL().withMessage('Debe ser una URL válida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Error en los datos enviados',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validaciones para Películas (Streaming)
const validarPelicula = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('genero').notEmpty().withMessage('El género es obligatorio'),
  body('anio').isInt({ min: 1900, max: 2100 }).withMessage('El año debe ser un número entre 1900 y 2100'),
  body('duracion').isInt({ min: 1 }).withMessage('La duración debe ser un número positivo (en minutos)'),
  body('clasificacion').notEmpty().withMessage('La clasificación es obligatoria'),
  body('urlVideo').isURL().withMessage('Debe ser una URL válida'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Error en los datos enviados',
        errors: errors.array() 
      });
    }
    next();
  }
];

module.exports = { validarUsuario, validarContenido, validarPelicula };