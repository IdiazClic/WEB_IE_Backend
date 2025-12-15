// backend/routes/documentos.routes.js

const express = require('express');
const router = express.Router(); 
const documentosController = require('../controllers/documentos.controller'); 
const verificarAdmin = require('../middleware/auth.middleware');

// 1. IMPORTAMOS el middleware de Multer que está configurado en otro archivo.
const uploadMiddleware = require('../middleware/upload.middleware'); 

// PÚBLICO: GET /api/documentos -> Lista de documentos para descarga
// Esta ruta apunta a la función que corregimos: getDocumentosPublicos
router.get('/', documentosController.getDocumentosPublicos); 

// 2. Usamos el middleware importado (uploadMiddleware) para crear el manejador de archivos.
// El nombre 'documento' debe coincidir con el campo en el Frontend.
const uploadDocumento = uploadMiddleware.single('documento'); 

// PROTEGIDO (Admin): POST /api/documentos -> Subir nuevo documento (PDF)
// Middleware: 1. verificarAdmin, 2. uploadDocumento (multer), 3. documentosController.create
router.post('/', verificarAdmin, uploadDocumento, documentosController.create); 

module.exports = router;