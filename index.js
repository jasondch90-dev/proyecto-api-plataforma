const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas
const usuariosRoutes = require('./src/routes/usuarios.routes');
const contenidosRoutes = require('./src/routes/contenidos.routes');
const peliculasRoutes = require('./src/routes/peliculas.routes'); // ← NUEVA

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/contenidos', contenidosRoutes);
app.use('/api/peliculas', peliculasRoutes); // ← NUEVA

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API de plataforma online funcionando correctamente 🚀' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});