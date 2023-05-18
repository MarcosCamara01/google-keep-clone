const Articulo = require("../modelos/Articulo");

const crear = (req, res) => {

    // recoger los parametros por post a guardar
    let parametros = req.body;

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Guardar articulo en la base de datos
    articulo.save((error, articuloGuardado) => {
        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo"
            });
        }

        // Guardar resultado
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo guardado con exito"
        })

    });

}

const listar = (req, res) => {
    let consulta = Articulo.find({});

    if (req.params.ultimos) {
        consulta.limit(3);
    }

    consulta.sort({ fecha: -1 })
        .exec((error, articulos) => {
            if (error || !articulos) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado artículos"
                });
            }

            return res.status(200).send({
                status: "success",
                contador: articulos.length,
                articulos
            });
        });
}

const borrar = (req, res) => {

    let articuloId = req.params.id;

    Articulo.findOneAndDelete({ _id: articuloId }, (error, articuloBorrado) => {

        if (error || !articuloBorrado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al borrar"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            mensaje: "Metodo de borrar"
        });
    });
}

const editar = (req, res) => {
    // Recoger id articulo a editar
    let articuloId = req.params.id;

    // Buscar y actualizar
    Articulo.findOneAndUpdate({ _id: articuloId }, req.body, { new: true }, (error, articuloActualizado) => {

        if (error || !articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            });
        }

        // Devolver respuesta
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });
    });

}

module.exports = {
    crear,
    listar,
    borrar,
    editar
}