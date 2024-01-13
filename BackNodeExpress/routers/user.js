const express = require('express');
const routerUsuarios = express.Router();
// models
const Usuario = require('../model/usuario.js');
const Documento = require('../model/documento.js');

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


routerUsuarios.get('/:lenguaje', (req, res) => {
    const lenguaje =  req.params.lenguaje;
    const result = programacion.filter(curso => curso.titulo === lenguaje);

    if (result.length === 0){
        return res.status(404).send(`No se encontro el lenguaje: ${lenguaje}`);

        // return res.status(404).end();
    }
    res.send(JSON.stringify(result));
});


routerUsuarios.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }

    res.send(JSON.stringify(programacion));

});


routerUsuarios.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);


    if (indice >= 0) {
        const cursoAmodificar = programacion[indice];
        Object.assign(cursoAmodificar, infoActualizada);
    }

    res.send(JSON.stringify(programacion));

});

routerUsuarios.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion.slice(indice, 1);
    }

    res.send(JSON.stringify(programacion));

});

module.exports = {
    routerUsuarios: routerUsuarios,
}
