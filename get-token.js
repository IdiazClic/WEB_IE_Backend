const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// Configuración de tu App de Firebase (obtén esto de la Configuración del Proyecto -> Apps)
const firebaseConfig = {
  apiKey: "AIzaSyATnjJ491zKU8MR59muFGJAkyJcOvDO8IM",
  authDomain: "web-ie-ff24e.firebaseapp.com",
  projectId: "web-ie-ff24e",
  storageBucket: "web-ie-ff24e.firebasestorage.app",
  messagingSenderId: "966043275504",
  appId: "1:966043275504:web:9dd8aaf66bc9a4d8ed3235",
  measurementId: "G-T9BEQZ3T4C"
};

// 1. Inicializar la app cliente
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function getToken() {
  try {
    console.log("Iniciando sesión...");
    // 2. Iniciar sesión con el usuario Administrador que creaste
    const userCredential = await signInWithEmailAndPassword(auth, 'admin@ie.edu.pe', 'S0p0rt3');

    // 3. Obtener el token de identificación
    const idToken = await userCredential.user.getIdToken();

    console.log("✅ Token obtenido con éxito. Úsalo en Postman:");
    console.log("\nBearer " + idToken + "\n");

  } catch (error) {
    console.error("Error al obtener token:", error.message);
  }
}

getToken();