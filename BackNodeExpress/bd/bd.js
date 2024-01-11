let listaUsuarios = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        edad: 25,
        correo: 'juan@example.com',
        password: 'admin',
        tipo: 'admin'
    },
    {
        id: 2,
        nombre: 'María López',
        edad: 30,
        correo: 'maria@example.com',
        password: 'admin',
        tipo: 'usuario',
    },
    {
        id: 3,
        nombre: 'María López',
        edad: 30,
        correo: 'benja@example.com',
        password: 'admin',
        tipo: 'med',
    },

    // Puedes agregar más usuarios según sea necesario
    ];

module.exports = {
    usuarios: listaUsuarios,
}