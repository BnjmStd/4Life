const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');


const controllers = require('./controllers/authentication.controller.js');

// Middleware para servir archivos estáticos desde la carpeta 'front'
app.use(express.static(path.join(__dirname, '../front')));

// cnfig json
app.use(express.json());

//Config Cors a todos *
app.use(cors());

const PUERTO = process.env.PORT || 3000;
// Routers
const routerUsuarios = require('./routers/user.js');
app.use('/api/users', routerUsuarios.routerUsuarios);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/index.html'));
});

// use page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/loginPage.html'));
});

// registro
app.post('/api/register', controllers.register);
app.post('/api/login', controllers.login);


app.listen(PUERTO, () => {
    console.log(`escuchando en: ${PUERTO}`);
});