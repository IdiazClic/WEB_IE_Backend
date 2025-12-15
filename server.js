// Cargar la configuración de la BD
const db = require('./config/db.config');
const express = require('express');
const cors = require('cors');

// 1. IMPORTAR la ruta de Noticias
const noticiasRoutes = require('./routes/noticias.routes'); // ¡Añadir esta línea!
const configRoutes = require('./routes/config.routes');
const documentosRoutes = require('./routes/documentos.routes'); // <-- ¡Importar!
const contactoRoutes = require('./routes/contacto.routes'); // <-- ¡Importar!

// Cargar las variables de entorno
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Para permitir peticiones desde el frontend
app.use(express.json()); // Para manejar datos JSON en las peticiones

// 2. USAR la ruta de Noticias con el prefijo /api/noticias
app.use('/api/noticias', noticiasRoutes); // ¡Añadir esta línea!
app.use('/api/config', configRoutes);
app.use('/api/documentos', documentosRoutes); // <-- ¡Usar la nueva ruta!
app.use('/api/contacto', contactoRoutes); // <-- ¡Usar la nueva ruta!

// ---------------------------------------------
// RUTA DE PRUEBA: Verificar Conexión y Servidor
// ---------------------------------------------
app.get('/', async (req, res) => {
    try {
        // Ejecutamos una consulta simple para probar la conexión
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        
        // Si no hay error, la conexión es exitosa
        res.status(200).json({
            message: '✅ Conexión a MySQL y Servidor Express exitosos!',
            result: rows[0].solution
        });

    } catch (error) {
        // Si hay un error, lo mostramos
        console.error("Error de conexión a la BD:", error);
        res.status(500).json({
            message: '❌ Error al conectar a MySQL. Revisa tus credenciales en .env',
            error: error.message
        });
    }
});

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Rutas
app.use('/api/noticias', noticiasRoutes); 
app.use('/api/config', configRoutes); // <-- ¡Usar la nueva ruta!

// ... (inicio del servidor)

// ---------------------------------------------
// INICIO DEL SERVIDOR
// ---------------------------------------------
app.listen(PORT, () => {
    console.log(`Servidor de la WEB_IE corriendo en puerto ${PORT}`);
});

