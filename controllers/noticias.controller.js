/// C:\Users\Usuario\WEB_IE\backend\controllers\noticias.controller.js

const Noticia = require('../models/noticias.model');
const { bucket } = require('../config/firebase.config'); 
const db = require('../config/db.config'); 
// const { query } = require('express'); // 🚨 Ya no es necesario

// ===================================
// 1. FUNCIÓN PÚBLICA: Obtener SOLO las noticias públicas (GET)
// ===================================
exports.getNoticiasPublicas = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, titulo, resumen, contenido_html, imagen_url, fecha_pub FROM noticias ORDER BY fecha_pub DESC');
        
        res.status(200).json(rows);
        
    } catch (error) {
        console.error("Error al obtener noticias públicas:", error); 
        res.status(500).json({
            message: "Error interno del servidor al consultar noticias.",
            error: error.message
        });
    }
};

// ===================================
// 2. FUNCIÓN PROTEGIDA: Crear una nueva noticia (POST)
// ===================================
exports.create = async (req, res) => { 
    // Aseguramos que req.body no sea nulo antes de desestructurar
    const body = req.body || {}; 
    const { titulo, contenido_html, es_evento, resumen } = body;
    
    let imagen_url = null;
    
    try {
        // 1. Verificación de campos mínimos necesarios
        if (!titulo || !contenido_html) {
            return res.status(400).json({ message: "Faltan campos obligatorios: título y contenido_html." });
        }
        
        // 2. Subida a Firebase Storage si hay un archivo
        if (req.file) {
            const fileName = `noticias/${Date.now()}_${req.file.originalname}`;
            const file = bucket.file(fileName);
            
            await file.save(req.file.buffer, {
                metadata: {
                    contentType: req.file.mimetype,
                },
                public: true, 
                validation: 'crc32c' 
            });

            imagen_url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        }
        
        // 3. Crear el objeto noticia para guardar en MySQL
        const nuevaNoticia = {
            titulo,
            contenido_html,
            // 🚨 CORRECCIÓN APLICADA: Usa el resumen provisto, o genera uno si contenido_html NO es nulo/undefined
            resumen: resumen || (contenido_html ? contenido_html.substring(0, 100) + '...' : titulo.substring(0, 50) + '...'), 
            // La línea 59 original estaba cerca de aquí (ahora línea 70)
            es_evento: es_evento === 'true' || es_evento === true, 
            imagen_url: imagen_url,
            // Agrega otros campos necesarios si tu tabla lo requiere, como id_usuario_admin
        };
        
        // 4. Guardar la noticia en MySQL 
        const resultado = await Noticia.create(nuevaNoticia);
        
        res.status(201).json({
            message: '✅ Noticia creada y publicada con éxito.',
            data: resultado
        });

    } catch (error) {
        console.error("Error al crear noticia:", error);
        res.status(500).json({
            message: "Error al procesar la subida y creación de la noticia.",
            error: error.message
        });
    }
};

// Puedes añadir más funciones como getById, update, delete, etc.