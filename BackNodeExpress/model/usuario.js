const mongoose = require('mongoose');

/*

tipoUsuario = {
    'admin': 1,
    'normal': 2,
    'previlegio': 3,
}

*/


const usuarioSchema = new mongoose.Schema({
    correo: { type: String, required: true, maxlength: 45 },
    nombre: { type: String,  maxlength: 45 },
    password: { type: String, required: true },
    tipoUsuario: { type: Number, required: true },
    peso: { type: Number },
    edad: { type: Number },
    altura: { type: Number },
    enfermedades_existentes: { type: String },
    alergias: { type: String },
    documentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documento' }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
