let listaUsuarios = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
    },
    ];


const dotenv = require('dotenv');

dotenv.config();


const mongoose = require('mongoose');

const uri = process.env.URI_DB;

mongoose
    .connect(uri)
    .then(() => {
    console.log('Conectado a MongoDB Atlas');
    })
    .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
    });

// También puedes manejar eventos después de la conexión
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
connection.once('open', () => {
    console.log('Conexión establecida con éxito');
});

module.exports = {
    mongoose,
}
