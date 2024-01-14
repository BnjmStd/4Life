const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  formato: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
  contenidoDoc: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

const Documento = mongoose.model('Documento', documentoSchema);

module.exports = Documento;