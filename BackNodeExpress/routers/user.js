const express = require('express');
const routerUsuarios = express.Router();
const bcryptjs = require('bcryptjs');

/* Middlewares & controllers */ 
const { CookieDocumento } = require('../middlewares/authorization.js');

// models
const Usuario = require('../model/usuario.js');
const Documento = require('../model/documento.js');

routerUsuarios.use(express.json());

routerUsuarios.get('/info', CookieDocumento, async (req, res) => {
    const usuario = await Usuario.findById(req.usuarioId);
    usuarioFront = {
        'correo': usuario.correo,
        'nombre': usuario.nombre,
        'peso': usuario.peso,
        'edad': usuario.edad,
        'altura': usuario.altura,
        'enfermedades_existentes': usuario.enfermedades_existentes,
        'alergias': usuario.alergias,
        'password': usuario.password,
    };
    return res.status(200).send(usuarioFront);
});

function validarCamposUsuario(body) {
    const camposRequeridos = ['nombre', 'peso', 'edad', 'altura', 'enfermedades_existentes', 'alergias'];

        for (const campo of camposRequeridos) {
        if (!(campo in body)) {
            throw new Error(`Campo '${campo}' no encontrado en el cuerpo de la solicitud`);
        }
    }
}

routerUsuarios.patch('/pwd', CookieDocumento, async(req, res) => {

    try{
        const {
            actualPassword,
            nuevaPassword,
        } = req.body;

        const user = await Usuario.findById(req.usuarioId);
        const ContrasenaCorrecta = await bcryptjs.compare(actualPassword, user.password);
        
        if (!ContrasenaCorrecta) {
            return res.status(400).send({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        /* inscriptar la contraseña
            agregaremos sal */
        const salt = await bcryptjs.genSalt(5);
        const hashPwd = await bcryptjs.hash(nuevaPassword, salt);

        user.password = hashPwd;
        
        await user.save();
        return res.status(200).send({ status: 'success'});

    }catch(error){

    }
});

routerUsuarios.patch('/info', CookieDocumento, async (req, res) => {
    try {
        validarCamposUsuario(req.body);
        const {
            nombre,
            peso,
            edad,
            altura,
            enfermedades_existentes,
            alergias,
        } = req.body;
    
        const usuarioId = req.usuarioId;
        const user = await Usuario.findById(usuarioId);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // pero si existe 
        user.nombre = nombre || user.nombre;
        user.peso = peso || user.peso;
        user.edad = edad || user.edad;
        user.altura = altura || user.altura;
        user.enfermedades_existentes = enfermedades_existentes || user.enfermedades_existentes;
        user.alergias = alergias || user.alergias;
        
        await user.save();
        return res.status(200).send({ status: 'success'});

    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 'Failed'});
    }
    return res.status(500).send({ status: 'Failed'});
});

/* windows admin */
routerUsuarios.get('/info/user/admin', CookieDocumento, async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('correo nombre password tipoUsuario');
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de usuarios' });
    }
});


routerUsuarios.delete('/delete/:id', async (req, res) => {
    const usuarioId = req.params.id;
    if(!usuarioId){
        return res.status(500).json({ mensaje: 'Error al obtener información de usuarios' });
    }
    try {
        // Eliminar el usuario
        await Usuario.findOneAndDelete({ _id: usuarioId });
    
        // Eliminar documentos relacionados
        await Documento.deleteMany({ usuario: usuarioId });
    
        return res.status(200).json({ message: 'Usuario y documentos relacionados eliminados exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar usuario y documentos relacionados' });
    }
});

module.exports = {
    routerUsuarios: routerUsuarios,
}
