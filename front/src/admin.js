

document.getElementById('bye').addEventListener('click', () => {
    const cookieName = 'jwt';

    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

    document.location.href = '/';
});

async function fetchAPI(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error; 
    }
}

async function FetchRegister(mail, password, type) {
    const url = "http://localhost:3000/api/register";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password, type }),
    };

    try {
        await fetchAPI(url, options);
        cargarUsuarios();
    } catch (error) {
        console.error('Error en el registro:', error.message);
    }
}

document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    var mail = document.getElementById("email").value;
    var type = document.getElementById("tipoUser").value;
    var password = document.getElementById("password").value;
    await FetchRegister(mail, password, type);

    // Vaciar los campos del formulario después de enviarlo
    document.getElementById("email").value = "";
    document.getElementById("tipoUser").value = "";
    document.getElementById("password").value = "";

});

const usuariosCargados = new Set();
const usuarios = []; 
const usuariosPorPagina = 5; 
let paginaActual = 1;

async function eliminarUsuario(id) {

    const url = `http://localhost:3000/api/users/delete/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    // const res = await fetchAPI(url, options);
    console.log(id);

}


function agregarUsuario(id, nombre, email, tipoUsuario) {
    var table = document.getElementById("userTable").getElementsByTagName("tbody")[0];

    // Si el usuario ya está cargado, no hacer nada
    if (usuariosCargados.has(id)) {
        return;
    }

    // Insertar una nueva fila en la tabla
    var newRow = table.insertRow(table.rows.length - 1); // Restar 1 para tener en cuenta los encabezados

    // Insertar las celdas en la fila
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Agregar los datos a las celdas
    cell1.innerHTML = id;
    cell2.innerHTML = nombre;
    cell3.innerHTML = email;
    cell4.innerHTML = tipoUsuario;

    // Crear un botón de eliminar
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";

    // Agregar el evento de clic al botón
    deleteButton.addEventListener("click", function () {
        // Obtener el ID del usuario
        var userId = newRow.cells[0].innerHTML;

        // Mostrar el cuadro de diálogo de confirmación antes de eliminar
        var confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");

        if (confirmacion) {
            // Eliminar el evento de clic del botón
            deleteButton.removeEventListener("click", arguments.callee);

            // Eliminar el usuario
            eliminarUsuario(userId);

            // Obtener el índice de la fila
            var rowIndex = newRow.rowIndex - 1; // Restar 1 para tener en cuenta los encabezados

            // Validar el índice de la fila
            if (rowIndex < 0 || rowIndex >= table.rows.length) {
                console.error("Índice de fila no válido: " + rowIndex);
                return;
            }

            // Eliminar la fila de la tabla
            table.deleteRow(rowIndex);

            // Eliminar el ID del usuario de la lista de usuarios cargados
            usuariosCargados.delete(userId);
        }
    });

    // Agregar el botón a la última celda
    cell5.appendChild(deleteButton);

    // Agregar el ID del usuario a la lista de usuarios cargados
    usuariosCargados.add(id);
}


function mostrarPagina(pagina) {
    const inicio = (pagina - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;
    
    for (let i = inicio; i < fin && i < usuarios.length; i++) {
        const user = usuarios[i];
        agregarUsuario(user._id, user.nombre, user.correo, user.tipoUsuario);
    }
}

function mostrarPaginador() {
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
    const paginador = document.getElementById('paginador');
    paginador.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const enlace = document.createElement('a');
        enlace.href = '#';
        enlace.classList.add('page-link');
        enlace.textContent = i;

        enlace.addEventListener('click', function() {
            cambiarPagina(i);
        });

        paginador.appendChild(enlace);
    }
}

function cambiarPagina(nuevaPagina) {
    if (nuevaPagina >= 1 && nuevaPagina <= Math.ceil(usuarios.length / usuariosPorPagina)) {
        paginaActual = nuevaPagina;
        limpiarTabla();
        mostrarPagina(paginaActual);
        marcarPaginaActual();
    }
}

function limpiarTabla() {
    const table = document.getElementById("userTable").getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    usuariosCargados.clear();
}
function marcarPaginaActual() {
    const enlaces = document.querySelectorAll('.page-link');

    enlaces.forEach(enlace => {
        enlace.classList.remove('active');
        if (parseInt(enlace.textContent) === paginaActual) {
            enlace.classList.add('active');
        }
    });
}
function buscarUsuarios() {
    const input = document.getElementById('search-input');
    const searchTerm = input.value.toLowerCase();

    // Filtrar usuarios que coincidan con el término de búsqueda
    const resultados = usuarios.filter(user => {
        // Asegurarse de que user.nombre sea una cadena antes de llamar a toLowerCase()
        const nombre = user.nombre && typeof user.nombre === 'string' ? user.nombre.toLowerCase() : '';

        return nombre.includes(searchTerm);
    });

    // Limpiar la tabla y mostrar los resultados de la búsqueda
    limpiarTabla();
    resultados.map(user =>
        agregarUsuario(user._id, user.nombre, user.correo, user.tipoUsuario)
    );
};

async function cargarUsuarios() {
    const url = "http://localhost:3000/api/users/info/user/admin";
    const options = {
        method: "GET",
        headers: {
            'Authorization': `${document.cookie}`,
        },
    };

    try {
        const respuesta = await fetchAPI(url, options);
        if (Array.isArray(respuesta)) {
            // Cambia el nombre de la variable global
            usuarios.length = 0; // Limpiar el array original
            usuarios.push(...respuesta);
            mostrarPagina(paginaActual);
            mostrarPaginador();
        } else {
            console.error('La respuesta no es un array:', respuesta);
        }
    } catch (error) {
        console.error(error);
    }
}

cargarUsuarios();