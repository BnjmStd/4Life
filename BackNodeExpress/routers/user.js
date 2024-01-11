const express = require('express');
const routerProgramacion = express.Router();

const {programacion} = require('../bd/bd').infoCursos;
//middleware function next

routerProgramacion.use(express.json());



routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion));
});


routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje =  req.params.lenguaje;
    const result = programacion.filter(curso => curso.titulo === lenguaje);

    if (result.length === 0){
        return res.status(404).send(`No se encontro el lenguaje: ${lenguaje}`);

        // return res.status(404).end();
    }
    res.send(JSON.stringify(result));
});


routerProgramacion.post('/', (req, res) => {
    let cursonew = req.body;

    programacion.push(cursonew);

    res.send(JSON.stringify(programacion));
});


routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }

    res.send(JSON.stringify(programacion));

});


routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);


    if (indice >= 0) {
        const cursoAmodificar = programacion[indice];
        Object.assign(cursoAmodificar, infoActualizada);
    }

    res.send(JSON.stringify(programacion));

});

routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion.slice(indice, 1);
    }

    res.send(JSON.stringify(programacion));

});

module.exports = {
    routerProgramacion: routerProgramacion,
}
