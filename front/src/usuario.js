document.getElementById('bye').addEventListener('click', () => {
    const cookieName = 'jwt';

    document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;

    document.location.href = '/';
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

function agregarDocumentos(resJson) {
    const pdfContainer = document.getElementById('pdfViewer');

    // Quitar la clase 'hidden' para mostrar la tabla
    pdfContainer.classList.remove('hidden');

    const tbody = document.querySelector('#documentosTable tbody');

    // Limpiar el contenido de la tabla 
    tbody.innerHTML = '';

    // lista de documentos
    resJson.documentos.forEach(doc => {
        // Crear una fila de la tabla
        const fila = document.createElement('tr');

        // Crear una celda para el ícono
        const celdaIcono = document.createElement('td');
        const pdfIcon = document.createElement('img');
        pdfIcon.src = '../img/pdf.png';  // Reemplaza con la ruta de tu ícono
        pdfIcon.alt = 'PDF Icon';
        celdaIcono.appendChild(pdfIcon);

        // Crear una celda para el nombre del documento
        const celdaNombre = document.createElement('td');
        const pdfName = document.createElement('span');
        pdfName.textContent = doc.nombre || 'Documento PDF';
        celdaNombre.appendChild(pdfName);

        // Crear una celda para la fecha del documento
        const celdaFecha = document.createElement('td');
        const pdfFecha = document.createElement('span');
        pdfFecha.textContent = new Date(doc.fechaCreacion).toLocaleDateString(); 
        celdaFecha.appendChild(pdfFecha);

        // Crear una celda para el botón
        const celdaBoton = document.createElement('td');
        const boton = document.createElement('button');
        boton.textContent = 'Analizar'; 
        boton.addEventListener('click', () => {
            console.log('Algo pasa aqui:', doc.nombre);
        });
        celdaBoton.appendChild(boton);

        // Agregar las celdas a la fila
        fila.appendChild(celdaIcono);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaBoton);

        // Agregar la fila a la tabla
        tbody.appendChild(fila);
    });
}

async function cambiarContenido(seccion) {
    // Ocultar todos los formularios
    const formularios = document.querySelectorAll('.encuestaForm, .dropzone-box .pdf');
    formularios.forEach(form => form.classList.add('hidden'));

    // Mostrar el formulario específico
    if (seccion === 'Home') {

    } else if (seccion === 'Profile') {
        const formularioProfile = document.getElementById('profileForm');
        if (formularioProfile) {
            formularioProfile.classList.remove('hidden');
        }
    } else if (seccion === 'Subir Documentos') {
        const formularioDocumentos = document.getElementById('documentosForm');
        if (formularioDocumentos) {
            formularioDocumentos.classList.remove('hidden');
        }
    } else if (seccion === 'Documentos') {
        const tablaDocumentos = document.getElementById('pdfViewer');
        if (tablaDocumentos) {

            await tablaDocumentosInfo();
        }
        
    }
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
