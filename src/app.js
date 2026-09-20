// ============================================================
//  EventHive — Servidor principal
// ============================================================
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // ← 1. Agregado require de Helmet junto a express y cors

const { inicializarBaseDeDatos } = require("./db/conexion");
const authRoutes = require("./routes/auth.routes");
const boletosRoutes = require("./routes/boletos.routes");
const compradoresRoutes = require("./routes/compradores.routes");
const { rutaNoEncontrada } = require("./middlewares/errores.middleware");

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(express.json());

// ============================================================
//  Ticket 2: Configuración de Headers de Seguridad con Helmet
// ============================================================
app.use(helmet()); // ← 2. Agregado ANTES de app.use(cors(...))

// ============================================================
//  🚨 HALLAZGO DEL REPORTE #5: CORS mal configurado
// ============================================================
app.use(cors({
    origin: ["https://eventhive.com", "http://localhost:5173"],
}));

app.use("/auth", authRoutes);
app.use("/boletos", boletosRoutes);
app.use("/compradores", compradoresRoutes);

app.get("/", (req, res) => {
    res.json({ mensaje: "EventHive API — en auditoría 🕵️" });
});

app.use(rutaNoEncontrada);

async function iniciarServidor() {
    await inicializarBaseDeDatos();

    app.listen(PUERTO, () => {
        console.log(`🚀 EventHive corriendo en http://localhost:${PUERTO}`);
    });
}

iniciarServidor();