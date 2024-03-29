const  JsonWebTokenError  = require('jsonwebtoken');
const bd =  require('../bd/bd.js');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

/* Cargar Modelos */
const Usuario = require('../model/usuario.js');

/* Cargar variables de entorno */
dotenv.config();

async function login( req, res ){
    try {
        const mail = req.body.emailInput;
        const pwd = req.body.passwordInput;

        if (!mail || !pwd) {
            return res.status(400).send({ status: 'error', message: 'Ingrese datos' });
        }

        const usuarioRevisar = await Usuario.findOne({ correo: mail });

        if (!usuarioRevisar) {
            return res.status(400).send({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        const loginCorrecto = await bcryptjs.compare(pwd, usuarioRevisar.password);

        if (!loginCorrecto) {
            return res.status(400).send({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        /* aqui trabajaré exponiendo la _id de la bd en la URL,
        averigue que por buenas prácticas no se hace pero para enfocarme en la 
        funcionalidad final de la práctica lo omitiré  */

        const token = JsonWebTokenError.sign(
            { id: usuarioRevisar._id.toString() }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIME },
        );

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_TIME * 24 * 60 * 60 * 1000),
            path: '/',
        };

        res.cookie('jwt', token, cookieOption);

        if(usuarioRevisar.tipoUsuario === 1){
            return res.send({ status: 'ok', message: 'Inicio de sesión exitoso', redirect: `/admin/${usuarioRevisar._id.toString()}`});  //redireccionar a la ID PERSONAL
        }

        return res.send({ status: 'ok', message: 'Inicio de sesión exitoso', redirect: `/user/${usuarioRevisar._id.toString()}` });  //redireccionar a la ID PERSONAL

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return res.status(500).send({ status: 'error', message: 'Error interno del servidor' });
    }
}

async function register( req, res ){
    try {
        const correo = req.body.mail;
        const pwd = req.body.password;
        const pwd2 = req.body.password2 ?? pwd;
        const type = req.body.type ?? 2;
        /* Validación datos vacíos */
        if (!correo || !pwd || !pwd2) {
            return res.status(400).send({ status: 'error', message: 'Los campos vacíos no funcionan' });
        }

        if (pwd !== pwd2) {
            return res.status(400).send({ status: 'error', message: 'Contraseñas no coinciden' });
        }

        /* Verificación de si el correo ya existe */
        const usuarioEncontrado = await Usuario.findOne({ correo: correo });

        if (usuarioEncontrado) { 
            return res.status(400).send({ status: 'error', message: 'Correo en uso' });
        
        } else { 

            /* inscriptar la contraseña
            agregaremos sal */
            const salt = await bcryptjs.genSalt(5);
            const hashPwd = await bcryptjs.hash(pwd, salt);

            const nuevoUsuario = new Usuario({
                correo: correo,
                password: hashPwd,
                tipoUsuario: type, 
            });

            const usuarioGuardado = await nuevoUsuario.save();

            return res.status(201).send({ status: 'ok', message: `Usuario registrado exitosamente:` , redirect: '/login'});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'Error al registrar' });
    }
}

module.exports = {
    login, 
    register,
};