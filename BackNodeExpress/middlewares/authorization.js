const JsonWebTokenError  = require('jsonwebtoken');
const bd =  require('../bd/bd.js');
const dotenv = require('dotenv');


/* Cargar Modelos */
const Usuario = require('../model/usuario.js');

/* Cargar variables de entorno */
dotenv.config();


async function soloPublic(req, res, next) {
    try {
        const logeado = await revisarCookie(req);

        if (!logeado) {
            return next();  // Continuar con el siguiente middleware o ruta
        }
        const cookies = req.headers.cookie;
        const cookieJWT = cookies.split('; ').find(cookie => cookie.startsWith('jwt'));
        const token = cookieJWT.slice(4);
        const cookieDecof = JsonWebTokenError.verify(token, process.env.JWT_SECRET);
        return res.redirect(`/user/${cookieDecof.id.toString()}`);  // Redireccionar a la página de usuarios
    } catch (error) {
        console.error('Error al verificar la cookie:', error);
        return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
}

async function soloLogeado(req, res, next) {
    try {
        const logeado = await revisarCookie(req);
        if (logeado) {
            return next();
        }
        return res.redirect('/');
    } catch (error) {
        console.error('Error al verificar la cookie:', error);
        return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
}

async function revisarCookie(req) {
    try {
        let cookies = req.headers.cookie;

        if (!cookies) {
            return false;
        }
        const cookieJWT = cookies.split('; ').find(cookie => cookie.startsWith('jwt'));

        if (!cookieJWT) {
            return false;
        }
        const token = cookieJWT.slice(4);
        const cookieDecof = JsonWebTokenError.verify(token, process.env.JWT_SECRET);

        const usuarioRevisar = await Usuario.findOne({ _id: cookieDecof.id });
        req.usuarioId = cookieDecof.id;
        
        return !!usuarioRevisar;

    } catch (error) {
        console.error('Error al revisar la cookie:', error);
        return false;
    }
}

async function revisarIdentidad(req, res, next){
    try {
        let cookies = req.headers.cookie;
        
        const cookieJWT = cookies.split('; ').find(cookie => cookie.startsWith('jwt'));

        if (!cookieJWT) {
            // No hay token en las cookies
            return res.status(401).send({ status: 'error', message: 'Acceso no autorizado' });
        }

        const token = cookieJWT.slice(4);
        const cookieDecof =  JsonWebTokenError.verify(token, process.env.JWT_SECRET);

        // Comparar el id en la cookie con el id en la ruta
        if (cookieDecof.id !== req.params.id) {
            return res.status(403).send({ status: 'error', message: 'Acceso no autorizado al recurso' });
        }

        // Si el id coincide, permitir el acceso
        return next();
    } catch (error) {
        console.error('Error al revisar la identidad:', error);
        return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
}

async function CookieDocumento(req, res, next){

    let cookies = req.headers.authorization;

    if (!cookies) {

        return res.status(500).send({ status: 'error', message: 'Error interno Cookie del servidor' });
    }
    const cookieJWT = cookies.split('; ').find(cookie => cookie.startsWith('jwt'));
    if (!cookieJWT) {
        console.log('llegue al cookie');
        return res.status(500).send({ status: 'error', message: 'Error interno Cookie del servidor' });
    }
    const token = cookieJWT.slice(4);
    const cookieDecof = JsonWebTokenError.verify(token, process.env.JWT_SECRET);

    req.usuarioId = cookieDecof.id;
    return next();
};



module.exports = {
    soloLogeado,
    soloPublic,
    revisarIdentidad,
    CookieDocumento, 
}