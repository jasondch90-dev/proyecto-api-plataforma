const { db } = require('../config/firebase');

// Crear un contenido
const crearContenido = async (req, res) => {
  try {
    const { titulo, descripcion, artista, categoria, urlVideo, duracion } = req.body;
    const nuevoContenido = { 
      titulo, 
      descripcion, 
      artista, 
      categoria, 
      urlVideo, 
      duracion: duracion || 0, 
      fechaCreacion: new Date() 
    };
    
    const docRef = await db.collection('contenidos').add(nuevoContenido);
    
    res.status(201).json({
      success: true,
      message: 'Contenido creado exitosamente',
      data: { id: docRef.id, ...nuevoContenido }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear contenido', error: error.message });
  }
};

// Obtener todos los contenidos
const obtenerContenidos = async (req, res) => {
  try {
    const snapshot = await db.collection('contenidos').get();
    const contenidos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: contenidos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener contenidos', error: error.message });
  }
};

// Obtener un contenido por ID
const obtenerContenidoPorId = async (req, res) => {
  try {
    const doc = await db.collection('contenidos').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Contenido no encontrado' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener contenido', error: error.message });
  }
};

// Actualizar un contenido
const actualizarContenido = async (req, res) => {
  try {
    const { titulo, descripcion, artista, categoria } = req.body;
    await db.collection('contenidos').doc(req.params.id).update({ titulo, descripcion, artista, categoria });
    res.status(200).json({ success: true, message: 'Contenido actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar contenido', error: error.message });
  }
};

// Eliminar un contenido
const eliminarContenido = async (req, res) => {
  try {
    await db.collection('contenidos').doc(req.params.id).delete();
    res.status(200).json({ success: true, message: 'Contenido eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar contenido', error: error.message });
  }
};

module.exports = { 
    crearContenido, 
    obtenerContenidos, 
    obtenerContenidoPorId, 
    actualizarContenido, 
    eliminarContenido 
};