const express = require('express');
const routerDocumento = express.Router();

/* Middlewares & controllers */ 
const { CookieDocumento } = require('../middlewares/authorization.js');

/* models */
const Documento = require('../model/documento.js');
const Usuario = require('../model/usuario.js');

/* Variables de entorno */
const dotenv = require('dotenv');

/* Cargar variables de entorno */
dotenv.config();
routerDocumento.use(express.json());

/* Ruta GET para obtener los documentos del usuario */
routerDocumento.get('/', CookieDocumento, async (req, res) => {
    try {
        console.log('asd', req.usuarioId);
      // Obtener el usuario actual
        const usuario = await Usuario.findById(req.usuarioId).populate('documentos');

        if (!usuario) {
            return res.status(404).send({ status: 'error', message: 'Usuario no encontrado' });
        }

        // Devolver la lista de documentos del usuario
        return res.status(200).send({ status: 'success', documentos: usuario.documentos });

    } catch (error) {
        console.error('Error al obtener documentos del usuario:', error);
        return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
});

routerDocumento.post('/', CookieDocumento, async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No hay archivos en req');
            return res.status(400).send({ status: 'error', message: 'Error al procesar el documento' });
        }
    
        const uploadedFile = req.files.uploadedFile;
        const archivoBuffer = uploadedFile.data;
        if (!uploadedFile || !archivoBuffer) {
            return res.status(400).send({ status: 'error', message: 'Error al procesar el documento' });
        }

        const nuevoDocumento = new Documento({
            nombre: uploadedFile.name,
            descripcion: 'Descripción del documento',
            formato: uploadedFile.mimetype,
            contenidoDoc: archivoBuffer.toString('base64'),
            usuario: req.usuarioId,
            fechaCreacion: Date.now(),
        });
        
        // Guardar el nuevo documento y obtener una promesa
        const documentoGuardadoPromise = nuevoDocumento.save();
        // Obtener el usuario y su lista de documentos
        const usuario = await Usuario.findById(req.usuarioId);
        if (!usuario) {
            console.error('Usuario no encontrado con el ID:', req.usuarioId);
            return res.status(500).send('Error interno del servidor');
        }
        // Antes de agregar el nuevo documento
        console.log('Documentos del usuario antes:', usuario.documentos);

        // Esperar a que la promesa del documento se resuelva y obtener el ID
        const documentoGuardado = await documentoGuardadoPromise;
        usuario.documentos.push(documentoGuardado._id);

        // Después de agregar el nuevo documento
        console.log('Documentos del usuario después:', usuario.documentos);

        // Guardar el usuario actualizado
        await usuario.save();

        return res.status(201).send('Documento guardado con éxito');
    } catch (error) {
      // Manejar errores y enviar una respuesta de error
        console.error('Error al procesar el documento:', error);
        return res.status(500).json({ error: error.message });
    }
});


module.exports = {
    routerDocumento: routerDocumento,
}
