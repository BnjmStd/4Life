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

        // Verificación de si el correo ya existe
        const usuarioRevisar = await Usuario.findOne({ correo: mail });

        if (!usuarioRevisar) {
            return res.status(400).send({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        const loginCorrecto = await bcryptjs.compare(pwd, usuarioRevisar.password);

        if (!loginCorrecto) {
            return res.status(400).send({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        /* aqui trabajaré exponiendo la _id de la bd en la URL,
        averigue que por buenas prácticas no se hace pero para enfocarme en la funcionalidad final 
        de la práctica lo omitiré  */

        const token = JsonWebTokenError.sign(
            { id: usuarioRevisar._id.toString() }, // Convertir el ObjectId a una cadena
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
        const pwd2 = req.body.password2;

        /* Validación datos vacíos */
        if (!correo || !pwd || !pwd2) {
            return res.status(400).send({ status: 'error', message: 'Los campos vacíos no funcionan' });
        }

        if (pwd !== pwd2) {
            return res.status(400).send({ status: 'error', message: 'Contraseñas no coinciden' });
        }

        /* Verificación de si el correo ya existe */
        const usuarioEncontrado = await Usuario.findOne({ correo: correo });

        if (usuarioEncontrado) { // El correo ya está en uso
            return res.status(400).send({ status: 'error', message: 'Correo en uso' });
        
        } else { // El correo no está en uso
            /* Crear un nuevo usuario basado en los datos 
                recibidos en el cuerpo de la solicitud */

            /* inscriptar la contraseña
            agregaremos sal */
            const salt = await bcryptjs.genSalt(5);
            const hashPwd = await bcryptjs.hash(pwd, salt);

            const nuevoUsuario = new Usuario({
                correo: correo,
                password: hashPwd,
                tipoUsuario: 2, 
            });

            // Guardar el nuevo usuario en la base de datos
            const usuarioGuardado = await nuevoUsuario.save();

            // Responder con el usuario recién creado
            return res.status(201).send({ status: 'ok', message: `Usuario registrado exitosamente: ${usuarioGuardado}` , redirect: '/login'});
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