/* Cerrar sesión, elimina la cookie */
document.getElementById('bye').addEventListener('click', () => {
    const cookieName = 'jwt';

    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

    document.location.href = '/';
});

obtenerInformacionUsuario()

document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    let nombre = e.target.elements['nombre'].value;
    let peso = e.target.elements['peso'].value;
    let edad = e.target.elements['edad'].value;
    let altura = e.target.elements['altura'].value;
    let enfermedadesExistentes = e.target.elements['enfermedades_existentes'].value;
    let alergias = e.target.elements['alergias'].value;



    try {
        const res = await fetch('http://localhost:3000/api/users/info', {
            method: 'PATCH',
            headers: {
                'Authorization': `${document.cookie}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'nombre': nombre,
                'peso': peso,
                'edad': edad,
                'altura': altura,
                'enfermedades_existentes': enfermedadesExistentes, 
                'alergias': alergias,
                }),
        }); 

        if(res.ok){
            obtenerInformacionUsuario();
            const urlActual = window.location.href;
            
            if (urlActual.indexOf('#Profile') === -1) {
                const nuevaURL = `${urlActual}#Profile`;
                location.href = nuevaURL;
            } else {
                console.log('El fragmento #Profile ya existe en la URL.');
            }
        }{
        }
    } catch (error) {
        console.error(error);
        return
    }
});

async function tablaDocumentosInfo() {
    try {

        const res = await fetch('http://localhost:3000/api/documentos', {
            method: 'GET',
            headers: {
                'Authorization': `${document.cookie}`,
            },
        });
        if (!res.ok) {
            throw new Error('Error en la solicitud fetch');
        }

        const resJson = await res.json();
        agregarDocumentos(resJson);
    } catch (error) {
        console.error('Error en procesar la solicitud', error);
        throw error;
    }
}

function rellenarTablaInfo(resJson){
    // Obtener el elemento del formulario por su ID
    const profileForm = document.getElementById('profileForm');

    // Modificar el valor del campo "nombre"
    profileForm.elements['nombre'].value = resJson.nombre ?? '';

    // Modificar el valor del campo "peso"
    profileForm.elements['peso'].value = resJson.peso ?? 0; 

    // Modificar el valor del campo "edad"
    profileForm.elements['edad'].value = resJson.edad ?? 0; 

    // Modificar el valor del campo "altura"
    profileForm.elements['altura'].value = resJson.altura ?? 0; 

    // Modificar el valor del campo "enfermedades_existentes"
    profileForm.elements['enfermedades_existentes'].value = resJson.enfermedades_existentes ?? '';

    // Modificar el valor del campo "alergias"
    profileForm.elements['alergias'].value = resJson.alergias ?? '';
}

async function obtenerInformacionUsuario() {
    try {
        const res = await fetch('http://localhost:3000/api/users/info', {
            method: 'GET',
            headers: {
                'Authorization': `${document.cookie}`,
            },
        });

        if (!res.ok) {
            throw new Error('Error en la solicitud fetch');
        }

        const resJson = await res.json();
        rellenarTablaInfo(resJson);
        // el elemento <h1> por su id
        const h1Bienvenido = document.getElementById('bienvenido');

        // Actualiza el valor del elemento <h1> con la respuesta
        if(!resJson.nombre){
            h1Bienvenido.textContent = `Bienvenido, ${resJson.correo}`;
        } else {
            h1Bienvenido.textContent = `Bienvenido, ${resJson.nombre}`;
        }
        
    } catch (error) {
        console.error('Error en procesar la solicitud', error);
        throw error;
    }
}

function eliminarDocumento(documentoId) {
    // Realizar la solicitud fetch y manejarla como una promesa
    fetch(`http://localhost:3000/api/documentos/${documentoId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${document.cookie}`,
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Documento Eliminado con éxito.');
        } else {
            alert('Error al enviar el documento:', response.message);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud fetch:', error);
    });
}

function agregarDocumentos(resJson) {
    const tbody = document.querySelector('#documentosTable tbody');
    const fragmento = document.createDocumentFragment();

    // Elemento estático: Ícono PDF
    const pdfIcon = document.createElement('img');
    pdfIcon.src = '../img/pdf.png';  // Reemplaza con la ruta de tu ícono
    pdfIcon.alt = 'PDF Icon';

    // Iterar sobre la lista de documentos
    resJson.documentos.forEach(doc => {
        const fila = document.createElement('tr');

        // Celda para el ícono
        const celdaIcono = document.createElement('td');
        celdaIcono.appendChild(pdfIcon.cloneNode(true));

        // Celda para el nombre del documento
        const celdaNombre = document.createElement('td');
        const pdfName = document.createElement('span');
        pdfName.textContent = doc.nombre || 'Documento PDF';
        celdaNombre.appendChild(pdfName);

        // Celda para la fecha del documento
        const celdaFecha = document.createElement('td');
        const pdfFecha = document.createElement('span');
        pdfFecha.textContent = new Date(doc.fechaCreacion).toLocaleDateString();
        celdaFecha.appendChild(pdfFecha);

        // Celda para los botones
        const celdaBoton = document.createElement('td');
        const botonAnalizar = document.createElement('button');
        const botonBorrar = document.createElement('button');

        botonAnalizar.textContent = 'Visualizar';
        botonAnalizar.classList.add('btn-new');
        botonAnalizar.setAttribute('type', 'view');
        botonAnalizar.addEventListener('click', () => {
            fetch(`http://localhost:3000/api/documentos/view/${doc._id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el documento.');
                }
                const newWindow = window.open();
                newWindow.document.write(`<iframe src="${response.url}" width="100%" height="600px"></iframe>`);
            })
            .catch(error => {
                alert(error.message);
            });
        });

        botonBorrar.textContent = 'Borrar';
        botonBorrar.classList.add('btn-new');
        botonBorrar.setAttribute('type', 'borrar');
        botonBorrar.setAttribute('data-documento-id', doc._id.toString()); 
        botonBorrar.addEventListener('click', (event) => {
            // Obtener el documentoId del atributo de datos
            const documentoId = event.target.getAttribute('data-documento-id');

            // Confirmar si deseas eliminar el documento con este ID
            if (confirm(`¿Estás seguro de que deseas eliminar el documento con ID ${documentoId}?`)) {
                // Llamar a la función para eliminar el documento
                eliminarDocumento(documentoId);

                // Obtener la fila y eliminarla del DOM
                const fila = event.target.closest('tr');
                if (fila) {
                    fila.remove();
                    tablaDocumentosInfo();
                }
            }
        });

        celdaBoton.appendChild(botonAnalizar);
        celdaBoton.appendChild(botonBorrar);

        // Agregar las celdas a la fila
        fila.appendChild(celdaIcono);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaBoton);

        // Agregar la fila al fragmento
        fragmento.appendChild(fila);
    });

    // Limpiar el contenido de la tabla y agregar el fragmento
    tbody.innerHTML = '';
    tbody.appendChild(fragmento);
}

const dropzoneBox = document.getElementsByClassName('dropzone-box')[0];
const inputFiles = document.querySelectorAll(".dropzone-area input[type='file']");

const inputElement = inputFiles[0];
const dropzoneElement = inputElement.closest(".dropzone-area");

inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
        const file = inputElement.files[0];
        const fileName = file.name.toLowerCase();
        // Verificar la extensión del archivo
        if (fileName.endsWith('.pdf')) {
            // Es un document pdf
            // Verificar el tamaño del archivo (ejemplo: máximo 10 MB)
            const maxSizeMB = 3;
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (file.size <= maxSizeBytes) {
                updateDropzoneFileList(dropzoneElement, file);
            } else {
                let dropzoneFileMessage = dropzoneElement.querySelector(".message");
                inputElement.value = null;
                dropzoneFileMessage.innerHTML = "No archivos selec";
                alert('Tamaño del archivo no soportado');
            }
            return updateDropzoneFileList(dropzoneElement, file);
        } else {
            let dropzoneFileMessage = dropzoneElement.querySelector(".message");
            inputElement.value = null;
            dropzoneFileMessage.innerHTML = "No archivos selec";
            alert('Formato no soportado');
        }
    }
});


const updateDropzoneFileList = (dropzoneElement, file) => {
    let dropzoneFileMessage = dropzoneElement.querySelector(".message");
    dropzoneFileMessage.innerHTML = `${file.name}, ${file.size} bytes`;
};

dropzoneBox.addEventListener("reset", (e) => {
    let dropzoneFileMessage = dropzoneBox.querySelector(".message");
    dropzoneFileMessage.innerHTML = "No archivos selec";
});

dropzoneBox.addEventListener("submit", (e) => {
    e.preventDefault();
    const myFileInput = document.getElementById("upload-file");
    const file = myFileInput.files[0];
    
    if (file) {
        // Crear un objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append('uploadedFile', file);
        // Realizar la solicitud fetch y manejarla como una promesa
        fetch('http://localhost:3000/api/documentos', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `${document.cookie}`,
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Documento enviado con éxito.');
                tablaDocumentosInfo();
            } else {
                alert('Error al enviar el documento:', response.message);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
    } else {
        alert('No se ha seleccionado ningún archivo.');
    }
});

document.getElementById('cambiarContrasenaForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const actualPassword = document.getElementById('actualPassword').value;
    const nuevaPassword = document.getElementById('nuevaPassword').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;

    if (nuevaPassword !== confirmarPassword) {
        alert('La nueva contraseña y la confirmación no coinciden');
        return;
    }

    try {
        console.log('entre try');
        const response = await fetch('http://localhost:3000/api/users/pwd', {
            method: 'PATCH',
            headers: {
                'Authorization': `${document.cookie}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                actualPassword: actualPassword,
                nuevaPassword: nuevaPassword,
            }),
        });

        if (response.ok) {
            alert('Contraseña cambiada exitosamente');
        } else {
            alert('Error al cambiar la contraseña. Por favor, verifica tus credenciales y vuelve a intentarlo.');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Hubo un problema al intentar cambiar la contraseña. Por favor, inténtalo nuevamente.');
    }
});


/* modal */
// Obtén elementos del DOM
var modal = document.getElementById('myModal');
var btn = document.getElementById('openModalBtn');
var span = document.getElementsByClassName('close')[0];

// Función para abrir el modal
btn.onclick = function() {
    modal.style.display = 'block';
}

// Función para cerrar 
span.onclick = function() {
    modal.style.display = 'none';
}

// Función para cerrar el modal click
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function cambiarContenido(seccion) {
    // Ocultar todos los formularios
    const formularios = document.querySelectorAll('.encuestaForm, .pdf, .cambiarContrasenaForm');
    formularios.forEach(form => form.classList.add('hidden'));

    /* Modificar */
    let formularioPwd = document.getElementById('cambiarContrasenaForm');
    formularioPwd.classList.add('hidden');

    const urlFicticia = `window.location.hash#${seccion}`;
    // Mostrar el formulario específico
    if (seccion === 'Home' || urlFicticia === '#Home') {

    } else if (seccion === 'Profile' || urlFicticia === '#Profile') {
        const formularioProfile = document.getElementById('profileForm');
        if (formularioProfile) {
            formularioProfile.classList.remove('hidden');
        }
    } else if (seccion === 'Documentos' || urlFicticia === '#Documentos') {
        const tablaDocumentos = document.getElementById('pdfViewer');
        if (tablaDocumentos) {
            const pdfContainer = document.getElementById('pdfViewer');
            // Quitar la clase 'hidden' para mostrar la tabla
            pdfContainer.classList.remove('hidden');
            tablaDocumentosInfo();
        } 
    } else if (seccion === 'conf' || urlFicticia === '#conf') {
        let formularioPwd = document.getElementById('cambiarContrasenaForm');
        if (formularioPwd){
            formularioPwd.classList.remove('hidden');
        }
    }
}