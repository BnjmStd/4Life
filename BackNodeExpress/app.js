const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


/* Middlewares & controllers */ 
const methods = require('./middlewares/authorization.js');
const controllers = require('./controllers/authentication.controller.js');


/*  Config  */
const app = express();
app.use(express.json()); // json
app.use(cors()); // Cors a todos *
app.use(cookieParser()); // config cookis reads
app.use(express.static(path.join(__dirname, '../front'))); // Servir archivos estáticos desde la carpeta 'front'


/* Routers */
const routerUsuarios = require('./routers/user.js');
app.use('/api/users', routerUsuarios.routerUsuarios);

/* Pages Front*/
app.get('/', methods.soloPublic, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/index.html'));
});
app.get('/login', methods.soloPublic, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/loginPage.html'));
});
app.get('/admin',methods.soloAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/admin.html'));
});

/* Login & Registro */
app.post('/api/register', controllers.register);
app.post('/api/login', controllers.login);

app.listen(process.env.PORT, () => {
    console.log(`escuchando en: http://localhost:/${process.env.PORT}/`);
});