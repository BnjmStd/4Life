const express = require('express');
const routerUsuarios = express.Router();
/* Middlewares & controllers */ 
const { CookieDocumento } = require('../middlewares/authorization.js');

// models
const Usuario = require('../model/usuario.js');

routerUsuarios.use(express.json());

routerUsuarios.get('/info', CookieDocumento, async (req, res) => {

    // Carga la instancia del usuario
    const usuario = await Usuario.findById(req.usuarioId);
    
    console.log(usuario);

    usuarioFront = {
        'correo': usuario.correo,
        'nombre': usuario.nombre,
    };

    return res.status(200).send(usuarioFront);

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
