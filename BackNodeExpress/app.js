const express = require('express');
const app = express();
const cors = require('cors');

//cors

app.use(cors());


// Routers
const routerProgramacion = require('./routers/user.js');
app.use('/api/cursos/programacion', routerProgramacion.routerProgramacion);

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`escuchando en: ${PUERTO}`);
});