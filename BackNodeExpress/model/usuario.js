const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    correo: { type: String, required: true, maxlength: 45 },
    nombre: { type: String,  maxlength: 45 },
    password: { type: String, required: true },
    peso: { type: Number },
    edad: { type: Number },
    altura: { type: Number },
    enfermedades_existentes: { type: String },
    alergias: { type: String },
    documentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documento' }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
