# EventHive — Proyecto de Auditoría de Seguridad
### Misión 31 — LevelUp Code (Backend)

Este es el proyecto **vulnerable** que se usa para el live coding en clase. La carpeta `solucion/` tiene las versiones ya parchadas de cada archivo, como respaldo tuyo si algo se traba en vivo.

---

## 📋 Requisitos previos

- Node.js instalado (v18 o superior)
- pnpm instalado (`corepack enable` o `npm install -g pnpm`)
- VS Code con la extensión **REST Client**
- Un navegador cualquiera, para el checkpoint de CORS

No necesitas Supabase ni ninguna base de datos externa — el proyecto usa una base de datos Postgres **en memoria** (`pg-mem`) que se crea sola cada vez que arrancas el servidor. Cero configuración de DB.

---

## 🚀 Instalación

```bash
pnpm install
```

Luego copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env
```

El `.env` ya viene con una clave de ejemplo (`CLAVE_PAGO`) — no necesitas generar nada, es solo para que el checkpoint 3 tenga algo que mostrar.

---

## ▶️ Correr el proyecto

```bash
pnpm start
```

Si todo salió bien, en la terminal deberías ver:

```
📦 Base de datos en memoria lista, con compradores y eventos de prueba.
🚀 EventHive corriendo en http://localhost:3000
```

Cada vez que reinicias el servidor, la base de datos se recrea desde cero con los mismos datos de prueba. No hay que resetear nada a mano.

---

## 🗂️ Estructura del proyecto

```
src/
├── app.js                          → arranca el servidor, monta rutas, config de CORS
├── config/
│   └── pago.config.js              → 🚨 clave de pago (Checkpoint 3)
├── db/
│   └── conexion.js                 → base de datos en memoria + datos semilla
├── routes/                         → define los endpoints
├── controllers/                    → recibe la petición, llama al service, responde
├── services/                       → 🚨 aquí viven las queries SQL (Checkpoints 1 y 2)
└── middlewares/
    └── errores.middleware.js       → maneja rutas no encontradas

requests.http                       → todas las peticiones de prueba, listas para usar
frontend-test/index.html            → cliente de navegador para el checkpoint de CORS
docs/GUIA-INSTRUCTOR.md             → guion completo de la clase, con tiempos y preguntas
solucion/src/                       → versión parchada de cada archivo (referencia/respaldo)
```

Arquitectura de 4 capas, igual que en Misión 29: `routes → controllers → services → middlewares`.

---

## 🧪 Cómo probar cada hallazgo

1. Abre `requests.http` en VS Code.
2. Con el servidor corriendo, dale clic en **"Send Request"** encima de cada petición.
3. Sigue el orden de los checkpoints — cada uno tiene un comentario explicando qué esperar antes y después del fix.

Para el checkpoint de CORS (el único que no se prueba con REST Client), abre `frontend-test/index.html` directo en el navegador con doble clic, o con la extensión Live Server de VS Code.

---

## 🔧 Troubleshooting

**"Error: listen EADDRINUSE: address already in use :::3000"**
Ya hay algo corriendo en el puerto 3000. Ciérralo o cambia `PORT` en tu `.env` a otro número (ej. `3001`), y ajusta las URLs en `requests.http` y en `frontend-test/index.html` para que coincidan.

**"Cannot find module 'pg-mem'" o similar al arrancar**
Te faltó correr `pnpm install`. Bórralo y corre `pnpm install` de nuevo dentro de la carpeta del proyecto.

**El `.env` no existe / la clave sale como `undefined`**
No copiaste `.env.example` como `.env`. Corre `cp .env.example .env` desde la raíz del proyecto.

**REST Client no me deja mandar la petición de inyección SQL (el email con comillas)**
Asegúrate de copiar exactamente el JSON del archivo `requests.http`, sin modificar las comillas. VS Code a veces autocompleta comillas de forma rara — si falla, borra la línea y vuelve a pegarla directo del archivo original.

**Al abrir `frontend-test/index.html`, el botón no hace nada / error en consola**
Abre la consola del navegador con F12 antes de darle clic al botón — el error de CORS aparece ahí, no en la página. Si no aparece ningún error y el fetch simplemente no responde, confirma que el servidor (`pnpm start`) sigue corriendo.

**Reinicié el servidor y "perdí" los datos que había modificado en clase**
Es esperado — la base de datos vive en memoria y se recrea limpia cada vez que arrancas el servidor. Si necesitas volver a un estado limpio para repetir una demo, reiniciar el servidor es la forma más rápida de hacerlo.

**Quiero volver rápido a la versión sin fixes para repetir la demo con otro grupo**
Si ya modificaste `src/` en vivo, puedes recuperar el proyecto original descomprimiendo de nuevo el zip, o llevando control de los cambios con git desde antes de empezar la clase.

---
