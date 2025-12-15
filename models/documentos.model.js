// C:\Users\Usuario\WEB_IE\backend\models\documentos.model.js

const db = require('../config/db.config');

const Documento = {
    // Obtener todos los documentos públicos
    getPublicos: async () => {
        // 🚨 CORRECCIÓN CRÍTICA: Cambiar 'fecha_creacion' por 'fecha_publicacion' 🚨
        const query = 'SELECT * FROM documentos WHERE es_publico = 1 ORDER BY fecha_publicacion DESC';
        try {
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener documentos públicos: ${error.message}`);
        }
    },

    // Registrar un nuevo documento subido (usado por el Admin)
    create: async (nuevoDocumento) => {
        // La consulta de INSERT usa fecha_publicacion, por eso debemos usarla arriba
        const query = 'INSERT INTO documentos (nombre, descripcion, tipo_documento, archivo_url, fecha_publicacion, id_usuario_admin) VALUES (?, ?, ?, ?, CURDATE(), ?)';
        
        const { nombre, descripcion, tipo_documento, archivo_url, id_usuario_admin } = nuevoDocumento;
        
        try {
            const [result] = await db.query(query, [nombre, descripcion, tipo_documento, archivo_url, id_usuario_admin]);
            
            return { id: result.insertId, ...nuevoDocumento };
        } catch (error) {
            throw new Error(`Error al registrar documento: ${error.message}`);
        }
    }
};

module.exports = Documento;