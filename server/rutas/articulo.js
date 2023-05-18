const express = require("express");
const multer = require("multer");
const ArticuloControlador = require("../controladores/articulo");

const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './imagenes/articulos/');
    },
    filename: function(req, file, cb) {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
});

// Ruta util
router.post("/crear", ArticuloControlador.crear);
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);

module.exports = router;
