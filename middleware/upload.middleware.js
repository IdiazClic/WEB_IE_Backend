// backend/middleware/upload.middleware.js

const multer = require('multer');

/**
 * Configuración de Multer para manejar subidas de archivos.
 * Usamos 'memoryStorage' para que los archivos se almacenen temporalmente en la RAM del servidor
 * antes de ser enviados a Firebase Storage. Es la mejor práctica para servicios en la nube.
 */
const upload = multer({
    // Almacenamiento en memoria
    storage: multer.memoryStorage(),

    // Límite opcional de tamaño (ej: 10MB)
    limits: { 
        fileSize: 10 * 1024 * 1024 // 10 Megabytes
    },

    // Filtros opcionales si solo quieres permitir ciertos tipos de archivo
    fileFilter: (req, file, cb) => {
        // Ejemplo de filtro si solo quieres PDF y documentos (debes adaptarlo)
        if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('application/msword') || file.mimetype.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            cb(null, true);
        } else {
            // cb(new Error("Tipo de archivo no soportado"), false); 
            cb(null, true); // Dejamos que pase cualquier archivo por ahora para no complicar
        }
    }
});

// 🚨 ¡CRÍTICO! Exportamos la INSTANCIA completa de Multer (la variable 'upload').
// Esta instancia es la que tiene los métodos .single(), .array(), etc.
module.exports = upload;