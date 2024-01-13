const  JsonWebTokenError  = require('jsonwebtoken');
const bd =  require('../bd/bd.js');
const dotenv = require('dotenv');


/* Cargar Modelos */
const Usuario = require('../model/usuario.js');

/* Cargar variables de entorno */
dotenv.config();

function soloLogeado(req, res, next){
    const logeado = revisarCookie(req);

    if (logeado) return next();

    return res.redirect('/');
}


async function soloPublic(req, res, next) {
    try {
        const logeado = await revisarCookie(req);

        if (!logeado) {
            return next();  // Continuar con el siguiente middleware o ruta
        }

        console.log('Usuario logeado, redireccionando a /user');
        return res.redirect('/user');  // Redireccionar a la página de administrador
    } catch (error) {
        console.error('Error al verificar la cookie:', error);
        return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
}

async function revisarCookie(req) {
    try {
        const cookies = req.headers.cookie;

        if (!cookies) {
            return false;
        }

        const cookieJWT = cookies.split('; ').find(cookie => cookie.startsWith('jwt'));

        if (!cookieJWT) {
            return false;
        }

        const token = cookieJWT.slice(4);
        const cookieDecof = JsonWebTokenError.verify(token, process.env.JWT_SECRET);

        const usuarioRevisar = await Usuario.findOne({ correo: cookieDecof.nombre });

        return !!usuarioRevisar;

    } catch (error) {
        console.error('Error al revisar la cookie:', error);
        return false;
    }
}


module.exports = {
    soloLogeado,
    soloPublic,
}