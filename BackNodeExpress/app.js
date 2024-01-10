
// bd
const bd = require('./bd');


const express = require('express');


const app = express();

//routing
app.get('/', (req, res) => {
    res.send('Sv on');
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(bd.infoCursos));
});

app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(bd.infoCursos.programacion));
});

app.get('/api/cursos/matematica', (req, res) => {
    res.send(JSON.stringify(bd.infoCursos.matematicas));
});

const PUERTO = process.env.PORT || 3000;


app.listen(PUERTO, () => {
    console.log(`escuchando en: ${PUERTO}`);
});