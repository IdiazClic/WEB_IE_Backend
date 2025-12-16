# 🚀 Proyecto WEB_IE - Sitio Web de Noticias

Este repositorio contiene el código fuente completo (Frontend y Backend) del sitio web de noticias.

## 🔗 Enlaces del Proyecto Desplegado

| Servicio | URL Pública |
| :--- | :--- |
| **Página Web (Frontend)** | https://sider.ai/es/blog/ai-tools/how-to-deploy-an-ai-generated-website-on-render (ej: `https://web-ie-frontend.onrender.com`) |
| **API (Backend)** | https://render.com/docs/web-services (ej: `https://web-ie.onrender.com`) |

---

## 🛠️ Stack Tecnológico (Código Fuente)

El proyecto está dividido en dos microservicios y utiliza las siguientes tecnologías clave:

### 1. 🌐 Frontend (Carpeta `frontend/`)
* **Marco:** React
* **Bundler:** Vite
* **Estilos:** CSS / Bootstrap
* **Propósito:** Interfaz de usuario, gestión de la sesión de administrador (Login/Logout) y consumo de la API REST.

### 2. ⚙️ Backend (Carpeta `backend/`)
* **Servidor:** Node.js con Express
* **Autenticación y DB:** Firebase Admin SDK
* **Base de Datos (DB):** Firestore (NoSQL)
* **Almacenamiento de Archivos:** Firebase Storage (para subir imágenes de noticias)
* **Propósito:** Servidor de la API REST para crear, leer, actualizar y eliminar (CRUD) noticias.

---

## 🔑 Configuración de Variables de Entorno (Importante)

Para ejecutar este proyecto localmente o en un nuevo servidor de Render, se deben configurar las siguientes variables secretas (que NO están incluidas en este repositorio por seguridad):

### A. Para el Backend (Service Web)
| Clave | Propósito |
| :--- | :--- |
| `RENDER_SERVICE_ACCOUNT_KEY` | Clave privada JSON de Firebase Admin (para autenticación y acceso a Storage). |
| `PORT` | 3000 |

### B. Para el Frontend (Static Site)
| Clave | Propósito |
| :--- | :--- |
| `VITE_API_URL` | Dirección pública de la API REST (Backend). |
| `VITE_FIREBASE_API_KEY`, etc. | Claves públicas para la inicialización del cliente de Firebase (autenticación). |

---

## 💻 Instrucciones para Ejecución Local

1.  Clona el repositorio.
2.  Crea los archivos `.env` en `backend/` y `frontend/` con las variables de configuración.
3.  **Backend:** `cd backend` $\rightarrow$ `npm install` $\rightarrow$ `node server.js`
4.  **Frontend:** `cd frontend` $\rightarrow$ `npm install` $\rightarrow$ `npm run dev`
