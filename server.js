// C:\Users\Usuario\WEB_IE\backend\server.js

require('dotenv').config(); // Cargar variables de entorno (como VITE_API_URL)
const express = require('express');
const cors = require('cors');

// Importar rutas
const noticiasRoutes = require('./routes/noticias.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
// Permite que tu frontend de Render (o local) acceda a esta API
const corsOptions = {
    origin: '*', // 🚨 ADVERTENCIA: Cambia '*' por la URL de tu frontend en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware para parsear bodies JSON
app.use(express.urlencoded({ extended: true })); // Middleware para datos de formularios

// -----------------------------------------------------
// 🛑 CRÍTICO: SE ELIMINÓ EL CÓDIGO DE CONEXIÓN A MySQL
// -----------------------------------------------------

// Rutas de la API
app.get('/', (req, res) => {
    // Respuesta simple para verificar que el servidor está funcionando en Render
    res.status(200).send({ message: "Servidor de la WEB_IE API está activo." });
});

app.use('/api', noticiasRoutes); // Rutas para /api/noticias

// Manejador de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

// Inicio del Servidor
app.listen(PORT, () => {
    console.log(`Servidor de la WEB_IE corriendo en puerto ${PORT}`);
});
