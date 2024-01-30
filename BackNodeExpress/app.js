const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


const morgan = require('morgan'); 

/* Middlewares & controllers */ 
const methods = require('./middlewares/authorization.js');
const controllers = require('./controllers/authentication.controller.js');
const fileUpload = require('express-fileupload');

/*  Config  */
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // json
app.use(fileUpload()); // files en request
app.use(cors()); // Cors a todos *
app.use(cookieParser()); // config cookis reads
app.use(express.static(path.join(__dirname, '../front'))); // Servir archivos estáticos desde la carpeta 'front'

// Configurar morgan para imprimir logs en la consola
app.use(morgan('dev'));

/* Routers */
const routerUsuarios = require('./routers/user.js');
app.use('/api/users', routerUsuarios.routerUsuarios);
const routerDocumento = require('./routers/documento.js');
app.use('/api/documentos', routerDocumento.routerDocumento);

/* Pages Front*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/index.html'));
});
app.get('/login', methods.soloPublic, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/loginPage.html'));
});
app.get('/admin/:id',methods.soloLogeado, methods.soloAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/admin.html'));
});
app.get('/user/:id',methods.soloLogeado, methods.revisarIdentidad, (req, res) => {
    res.sendFile(path.join(__dirname, '../front/user.html'));
});
/* Login & Registro */
app.post('/api/register', controllers.register);
app.post('/api/login', controllers.login);

app.listen(process.env.PORT, () => {
    console.log(`escuchando en: http://localhost:/${process.env.PORT}/`);
});