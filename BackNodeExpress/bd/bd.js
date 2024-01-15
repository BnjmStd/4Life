const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const uri = process.env.URI_DB;

mongoose
    .connect(uri)
    .then(() => {
    console.log('Conectado a MongoDB Atlas');
    })
    .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
    });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
connection.once('open', () => {
    console.log('Conexión establecida con éxito');
});

module.exports = {
    mongoose,
}
