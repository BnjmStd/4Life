const express = require('express');
const routerDocumento = express.Router();
// models
const Documento = require('../model/documento.js');
const Usuario = require('../model/usuario.js');
routerDocumento.use(express.json());

/* Ruta GET para obtener todos los usuarios */
routerDocumento.get('/', async (req, res) => {
    try {
        const documento = await Documento.find();
        res.json(routerDocumento);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los documentos' });
    }
});

routerDocumento.post('/', async (req, res) => {
    try {
      // Crear una nueva instancia del modelo Documento con los datos proporcionados en el cuerpo de la solicitud
        const nuevoDocumento = new Documento({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        formato: req.body.formato,
        contenidoDoc: req.body.contenidoDoc,
        usuario: req.body.usuario // Asegúrate de proporcionar el ID del usuario adecuado
    });

    // Guardar el nuevo documento en la base de datos
    const documentoGuardado = await nuevoDocumento.save();
    // Actualizar la referencia del documento en el usuario
    await Usuario.findByIdAndUpdate(req.body.usuario, { $push: { documentos: documentoGuardado._id } });

      // Enviar una respuesta con el documento recién creado
    res.status(201).json(documentoGuardado);
    } catch (error) {
      // Manejar errores y enviar una respuesta de error
    res.status(500).json({ error: error.message });
    }
});

module.exports = {
    routerDocumento: routerDocumento,
}
