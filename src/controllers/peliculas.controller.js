const { db } = require('../config/firebase');

// Crear una película
const crearPelicula = async (req, res) => {
  try {
    const { titulo, genero, anio, duracion, clasificacion, urlVideo } = req.body;
    const nuevaPelicula = { 
      titulo, 
      genero, 
      anio, 
      duracion, 
      clasificacion, 
      urlVideo, 
      fechaCreacion: new Date() 
    };
    
    const docRef = await db.collection('peliculas').add(nuevaPelicula);
    
    res.status(201).json({
      success: true,
      message: 'Película creada exitosamente',
      data: { id: docRef.id, ...nuevaPelicula }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear película', error: error.message });
  }
};

// Obtener todas las películas
const obtenerPeliculas = async (req, res) => {
  try {
    const snapshot = await db.collection('peliculas').get();
    const peliculas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, data: peliculas });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener películas', error: error.message });
  }
};

// Obtener una película por ID
const obtenerPeliculaPorId = async (req, res) => {
  try {
    const doc = await db.collection('peliculas').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Película no encontrada' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener película', error: error.message });
  }
};

// Actualizar una película
const actualizarPelicula = async (req, res) => {
  try {
    const { titulo, genero, anio, duracion, clasificacion, urlVideo } = req.body;
    await db.collection('peliculas').doc(req.params.id).update({ 
      titulo, genero, anio, duracion, clasificacion, urlVideo 
    });
    res.status(200).json({ success: true, message: 'Película actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar película', error: error.message });
  }
};

// Eliminar una película
const eliminarPelicula = async (req, res) => {
  try {
    await db.collection('peliculas').doc(req.params.id).delete();
    res.status(200).json({ success: true, message: 'Película eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar película', error: error.message });
  }
};

module.exports = { 
  crearPelicula, 
  obtenerPeliculas, 
  obtenerPeliculaPorId, 
  actualizarPelicula, 
  eliminarPelicula 
};