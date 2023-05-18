const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Crear servidor de Node
const app = express();
const puerto = process.env.PORT;

// Configurar cors
app.use(cors({
    origin: 'https://keep-clone-1.web.app'
}));

// Convertir body a objeto js
app.use(express.json()); // recibir datos content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded

// RUTAS
const rutas_articulo = require("./rutas/articulo");

// Cargo las rutas
app.use("/api", rutas_articulo);

// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el pueto ${puerto}`);
    // Conectar a la Base de Datos
    conexion();
});
