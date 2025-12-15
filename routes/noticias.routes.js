// C:\Users\Usuario\WEB_IE\backend\routes\noticias.routes.js

const express = require('express');
const router = express.Router(); 

const noticiasController = require('../controllers/noticias.controller');
const verificarAdmin = require('../middleware/auth.middleware'); 

// 🚨 CORRECCIÓN CRÍTICA: Solo importamos la instancia de Multer una vez 🚨
const uploadMiddleware = require('../middleware/upload.middleware'); 

// Definición del manejador de subida de archivos
// 'imagen' es el nombre del campo que el Frontend enviará.
const uploadImage = uploadMiddleware.single('imagen'); 

// ===========================================
// RUTAS PÚBLICAS
// ===========================================

// Ruta: GET /api/noticias
// Acceso: Público (la página de inicio y el módulo de noticias lo usarán)
router.get('/', noticiasController.getNoticiasPublicas);


// ===========================================
// RUTAS PROTEGIDAS (ADMIN)
// ===========================================

// Ruta: POST /api/noticias
// Manejadores: 1. Autenticación, 2. Subida de imagen, 3. Creación en DB
router.post('/', verificarAdmin, uploadImage, noticiasController.create); 

module.exports = router;