const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');


const cors = require('cors');
const path = require('path');
const methods = require('./middlewares/authorization.js');

const controllers = require('./controllers/authentication.controller.js');

// Middleware para servir archivos estáticos desde la carpeta 'front'
app.use(express.static(path.join(__dirname, '../front')));

// cnfig json
app.use(express.json());

//Config Cors a todos *
app.use(cors());

// config cookis reads
app.use(cookieParser());

const PUERTO = process.env.PORT || 3000;
// Routers
const routerUsuarios = require('./routers/user.js');
app.use('/api/users', routerUsuarios.routerUsuarios);

app.get('/', methods.soloPublic, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/index.html'));
});
// use page
app.get('/login', methods.soloPublic, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/loginPage.html'));
});
//adminpage
app.get('/admin',methods.soloAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/admin.html'));
});
// registro
app.post('/api/register', controllers.register);
//login
app.post('/api/login', controllers.login);


app.listen(PUERTO, () => {
    console.log(`escuchando en: ${PUERTO}`);
});