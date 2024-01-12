const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
});

const Usuario = model('Usuario', usuarioSchema);


const express = require('express');
const routerUsuarios = express.Router();


routerUsuarios.use(express.json());

routerUsuarios.post('/usuarios', async (req, res) => {
    try {
      // Crear un nuevo usuario basado en los datos recibidos en el cuerpo de la solicitud
        const nuevoUsuario = new Usuario({
            nombre: req.body.nombre,
            correo: req.body.correo,
        });
        // Guardar el nuevo usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();

        // Responder con el usuario recién creado
        res.status(201).json(usuarioGuardado);
        
    } catch (error) {
        console.log(error);
        // Manejar errores de validación o cualquier otro error
        res.status(500).json({ error: 'Error al agregar usuario' });
    }
});

// Ruta GET para obtener todos los usuarios
routerUsuarios.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

routerUsuarios.get('/', (req, res) => {
    res.send(JSON.stringify(listaUsuarios));
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


routerUsuarios.post('/', (req, res) => {
    let cursonew = req.body;

    programacion.push(cursonew);

    res.send(JSON.stringify(programacion));
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
