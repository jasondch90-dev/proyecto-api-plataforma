const { db } = require('../config/firebase');

// Crear un usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUsuario = { nombre, email, password, fechaCreacion: new Date() };
    
    const docRef = await db.collection('usuarios').add(nuevoUsuario);
    
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: { id: docRef.id, ...nuevoUsuario }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
  }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    res.status(200).json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const doc = await db.collection('usuarios').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    await db.collection('usuarios').doc(req.params.id).update({ nombre, email });
    
    res.status(200).json({ success: true, message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    await db.collection('usuarios').doc(req.params.id).delete();
    res.status(200).json({ success: true, message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: error.message });
  }
};

module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario };