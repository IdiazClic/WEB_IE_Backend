// C:\Users\Usuario\WEB_IE\backend\models\noticia.model.js

const db = require('../config/db.config'); // Importamos la conexión a MySQL

// Objeto para manejar todas las interacciones de Noticias con la BD
const Noticia = {
    
    // ===========================================
    // MÉTODO 1: OBTENER SOLO NOTICIAS PÚBLICAS (Para el Frontend)
    // ===========================================
    getPublicas: async () => {
        // 🚨 CRÍTICO: Aseguramos el filtro por la columna 'es_publica' (o similar)
        // Usamos es_borrador = 0 si es la columna que indica que está publicado
        const query = 'SELECT id, titulo, SUBSTRING(contenido_html, 1, 150) as resumen, fecha_pub, imagen_url FROM noticias WHERE es_borrador = 0 ORDER BY fecha_pub DESC';
        try {
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener noticias públicas: ${error.message}`);
        }
    },
    
    // ===========================================
    // MÉTODO 2: OBTENER TODAS LAS NOTICIAS (Para el Admin)
    // ===========================================
    getAll: async () => {
        // Este método se mantiene por si el Admin lo necesita
        const query = 'SELECT id, titulo, SUBSTRING(contenido_html, 1, 150) as resumen, fecha_pub, imagen_url FROM noticias ORDER BY fecha_pub DESC';
        try {
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener todas las noticias: ${error.message}`);
        }
    },

    // ===========================================
    // MÉTODO 3: CREAR UNA NOTICIA (Para el Admin)
    // ===========================================
    create: async (nuevaNoticia) => {
        // Asegúrate de que esta tabla tiene una columna 'es_borrador' por defecto en 0 (público)
        const query = 'INSERT INTO noticias (titulo, contenido_html, imagen_url, es_evento) VALUES (?, ?, ?, ?)';
        const { titulo, contenido_html, imagen_url, es_evento } = nuevaNoticia;
        
        try {
            const [result] = await db.query(query, [titulo, contenido_html, imagen_url, es_evento]);
            return { id: result.insertId, ...nuevaNoticia };
        } catch (error) {
            throw new Error(`Error al crear noticia: ${error.message}`);
        }
    },
    
    // Aquí irían otros métodos: getById, update, delete, etc.
};


module.exports = Noticia;