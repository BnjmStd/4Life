const  JsonWebTokenError  = require('jsonwebtoken');
const bd =  require('../bd/bd.js');
const dotenv = require('dotenv');

dotenv.config();

function soloAdmin(req, res, next){
    const logeado = revisarCookie(req);

    if (logeado) return next();

    return res.redirect('/');
}


function soloPublic(req, res, next){
    const logeado = revisarCookie(req);

    if (!logeado) {
        console.log(logeado);
        return next();
    }
    console.log('asd');
    return res.redirect('/admin');
}

function revisarCookie(req){
    try {
        // console.log( "cookie", req.headers.cookie);
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt')).slice(4);

        const cookieDecof = JsonWebTokenError.verify(cookieJWT, process.env.JWT_SECRET);
        
        const usuarioRevisar = bd.usuarios.find(usuarios => usuarios.correo === cookieDecof.nombre);

        if(!usuarioRevisar) {
            return false;
        }
        return true;
        
    } catch (error) {
        return false;
    }
}


module.exports = {
    soloAdmin,
    soloPublic,
}