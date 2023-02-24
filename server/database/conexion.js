const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const conexion = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.set('strictQuery', false);
        console.log("Conectado correctamente a la base de datos");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    conexion
}