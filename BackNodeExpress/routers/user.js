const express = require('express');
const routerUsuarios = express.Router();
// models
const Usuario = require('../model/usuario.js');

routerUsuarios.use(express.json());

/* Ruta GET para obtener todos los usuarios */
routerUsuarios.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

routerUsuarios.get('/:id', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
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
