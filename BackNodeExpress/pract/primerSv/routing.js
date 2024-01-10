const http = require('http');
const cursos = require('./cursos');

const PUERTO = 3000;

const sv = http.createServer((req, res) => {

    const { method } = req;

    switch(method) {

        case 'GET':
            return manejarSolicitudGet(req, res);
        case 'POST':
            return manejarSolicitudPost(req,res);
        default:
            console.log(`${method} not proccessing`);
    }

});

function manejarSolicitudPost(req, res){
    const path = req.url;
    if (path === '/cursos/programacion' ){
        return res.end('process post');
    }
}

function manejarSolicitudGet(req, res) {
    const path = req.url;

    if (path === '/'){
        return res.end('Bienvenido a svBnjmn');
    } else if (path === '/cursos') {
        return res.end(JSON.stringify(cursos.infoCursos));
    } else if (path === '/cursos/programacion') {
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    }
    res.statusCode = 404;
    res.end('El sv dead');
}

sv.listen(PUERTO, () => {
    console.log(`El sv ok: Port ${PUERTO}`);
});