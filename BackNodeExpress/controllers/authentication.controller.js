const  JsonWebTokenError  = require('jsonwebtoken');
const bd =  require('../bd/bd.js');
const bcryptjs = require('bcryptjs');


const dotenv = require('dotenv');

dotenv.config();

async function login( req, res ){
    const mail = req.body.emailInput;
    const pwd = req.body.passwordInput;

    if(!mail || !pwd) {
        return res.status(400).send({status:'error', message: 'Ingrese datos'});
    }

    const usuarioRevisar = bd.usuarios.find(usuario => usuario.correo === mail);
    
    if (!usuarioRevisar){
        return res.status(400).send({status:'error', message: 'Usuario o contraseña errados'});
    }

    const loginCorrecto = await bcryptjs.compare(pwd, usuarioRevisar.password);


    if (!loginCorrecto) {
        return res.status(400).send({status:'error', message: 'Usuario o contraseña errados'});
    }
    const token = JsonWebTokenError.sign(
            {nombre: usuarioRevisar.correo}, 
            process.env.JWT_SECRET, 
            {expiresIn:process.env.JWT_TIME},
        );
    
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_TIME * 24 * 60 * 60 * 1000),
        path: '/',
    };

    res.cookie('jwt', token, cookieOption);
    return res.send({status: 'ok', message: 'user log', redirect: '/admin'});
}


async function register( req, res ){
    const mail = req.body.username;
    const pwd = req.body.password;
    const pwd2 = req.body.password2;

    if (!mail || !pwd || !pwd2){
        return res.status(400).send({status: 'error', message: 'Los campos vacios no funcionan'});
    }
    const usuarioRevisar = bd.usuarios.find(usuario => usuario.correo === mail);

    if (usuarioRevisar) {
        return res.status(400).send({status: 'error', message: 'Correo ya existe'});
    }

    // ahora que paso debo inscriptar la contraseña
    // le agregaremos sal
    const salt = await bcryptjs.genSalt(5);
    const hashPwd = await bcryptjs.hash(pwd, salt);
    

    bd.usuarios.push({correo: mail, password: hashPwd});

    console.log(bd.usuarios);
    return res.status(201).send({status: 'ok', message: `Usuario registrado`, redirect: '/login'});

}

module.exports = {
    login, 
    register,
};