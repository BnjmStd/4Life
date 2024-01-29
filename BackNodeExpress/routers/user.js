const express = require('express');
const routerUsuarios = express.Router();

/* Middlewares & controllers */ 
const { CookieDocumento } = require('../middlewares/authorization.js');

// models
const Usuario = require('../model/usuario.js');

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


routerUsuarios.patch('/info', CookieDocumento, async (req, res) => {
    console.log(req.body);
});

/*
windows admin
*/
routerUsuarios.get('/info/user/admin', CookieDocumento, async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('correo nombre password tipoUsuario');
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de usuarios' });
    }
});

/*
windows admin
*/
routerUsuarios.post('/info/user/admin', CookieDocumento, async (req, res) => {
    try {
        console.log('uwu');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error al obtener información de usuarios' });
    }
});


routerUsuarios.put('/:id', (req, res) => {
    const usuarioActualizado = req.body;
    const id = req.params.id;
    console.log('intentando actualizar');
});

routerUsuarios.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('intentando Eliminar');
});

routerUsuarios.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id); //comparar
    if (indice >= 0) {
        const cursoAmodificar = programacion[indice];
        Object.assign(cursoAmodificar, infoActualizada);
    }
    console.log('intentando actualizar patch');
});

module.exports = {
    routerUsuarios: routerUsuarios,
}
