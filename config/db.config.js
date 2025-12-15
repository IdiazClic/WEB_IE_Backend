// C:\Users\Usuario\WEB_IE\backend\config\db.config.js

// Importamos 'dotenv' para cargar las variables del archivo .env
require('dotenv').config(); 

// Importamos el cliente de MySQL (mysql2)
const mysql = require('mysql2');

// --- 🚨 CREACIÓN DEL POOL DE CONEXIONES CON CORRECCIONES DE SEGURIDAD 🚨 ---
// Usamos createPool en lugar de createConnection para manejar múltiples peticiones.
const pool = mysql.createPool({
    // Variables de Entorno del .env
    host: '127.0.0.1', // 🚨 CORRECCIÓN: Usamos IP directa para evitar problemas de resolución de host
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,

    // Configuración del Pool
    waitForConnections: true,
    connectionLimit: 10, // Límite de conexiones simultáneas recomendado
    queueLimit: 0,
    
    // 🚨 CORRECCIÓN CRÍTICA: Forzar la autenticación antigua (necesario para la compatibilidad con MySQL 8.0 y Node.js)
    authPlugins: {
        mysql_native_password: () => () => Buffer.from(process.env.DB_PASSWORD),
    },
});

// Convertimos el pool en promesas para poder usar la sintaxis async/await
const promisePool = pool.promise();

// 🚨 Exportamos la versión del Pool con Promesas para que se use en los controllers
module.exports = promisePool;