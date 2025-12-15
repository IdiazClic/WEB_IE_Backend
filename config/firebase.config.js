// backend/firebase.config.js

const admin = require('firebase-admin');
const serviceAccount = require('../firebase-key.json'); // Asegura la ruta

// Nombre del bucket que GCS espera (formato estándar)
const BUCKET_NAME = "web-ie-ff24e.appspot.com";

// Inicializar la aplicación de Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET_NAME
});

// AÑADE ESTO para ver si el módulo se inicializó
console.log(`Firebase Admin SDK inicializado. Usando bucket: ${BUCKET_NAME}`); 

const bucket = admin.storage().bucket();

module.exports = {
    bucket,
    admin 
};