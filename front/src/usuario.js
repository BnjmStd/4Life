function cambiarContenido(seccion) {
    // Ocultar todos los formularios
    const formularios = document.querySelectorAll('.encuestaForm, .dropzone-box');
    formularios.forEach(form => form.classList.add('hidden'));

    // Mostrar el formulario específico
    if (seccion === 'Home') {
        const cookies = document.cookie;

        console.log(cookies);

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
        const tablaDocumentos = document.getElementById('tablaDocumentos');
        if (tablaDocumentos) {
            tablaDocumentos.classList.remove('hidden');
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
                // Realizar acciones adicionales si es un PDF y el tamaño es aceptable
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

        console.log(`Tiene: ${formData.get('uploadedFile')}`);
        
        // Realizar la solicitud fetch y manejarla como una promesa
        fetch('http://localhost:3000/api/documentos', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                console.log('Documento enviado con éxito.');
            } else {
                console.error('Error al enviar el documento:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
    } else {
        console.warn('No se ha seleccionado ningún archivo.');
    }
});
