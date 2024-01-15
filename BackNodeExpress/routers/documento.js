const express = require('express');
const routerDocumento = express.Router();
// models
const Documento = require('../model/documento.js');
const Usuario = require('../model/usuario.js');

routerDocumento.use(express.json());

/* Ruta GET para obtener todos los usuarios */
routerDocumento.get('/', async (req, res) => {
    try {
        const documentos = await Documento.find(); // Cambié el nombre de la variable a "documentos"
        res.json(documentos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los documentos' });
    }
});

routerDocumento.post('/', async (req, res) => {
    try {
        if(!req.files) {
            console.log('no hay files en req');
        }
        else{
            let file = req.files.uploadedFile;
            console.log(file);
        }
    } catch (error) {
          // Manejar errores y enviar una respuesta de error
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    routerDocumento: routerDocumento,
}
