const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
    titulo: {
        type: String
    },
    contenido: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Article", ArticleSchema, "articles");