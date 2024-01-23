document.getElementById('bye').addEventListener('click', () => {
    const cookieName = 'jwt';

    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

    document.location.href = '/';
});


// Función para agregar un nuevo usuario a la tabla
function agregarUsuario(id, nombre, email) {
    var table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = id;
    cell2.innerHTML = nombre;
    cell3.innerHTML = email;
    cell4.innerHTML = '<a href="#">Editar</a> | <a href="#">Eliminar</a>';
}

// Event listener para el formulario de usuario
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe normalmente

    // Obtener valores del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;

    // Simular obtención del ID (puedes obtenerlo de tu backend)
    var id = Math.floor(Math.random() * 1000) + 1;

    // Agregar nuevo usuario a la tabla
    agregarUsuario(id, nombre, email);
});

// Cargar datos desde la API
try {
    fetch("http://localhost:3000/api/users/info/user/admin", {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // Imprime los datos en la consola para entender su estructura

        // Procesar los datos y agregar a la tabla
        // Asegúrate de que data.usuarios es un array antes de usar forEach
        if (Array.isArray(data.usuarios)) {
            data.usuarios.forEach(user => {
                agregarUsuario(user.id, user.nombre, user.correo);
            });
        } else {
            console.error('El campo "usuarios" no es un array:', data);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
} catch (error) {
    console.error('Error en la solicitud:', error);
}
