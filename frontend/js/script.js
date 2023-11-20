document.addEventListener("DOMContentLoaded", function () {
    const dataContainer = document.getElementById("data-container");

    // Función para realizar la solicitud GET a la API
    fetch('http://127.0.0.1:8000/db')
        .then(response => response.json()) // Parsea la respuesta a JSON
        .then(data => {
            // Maneja los datos recibidos de la API
            dataContainer.innerHTML = `Los datos de la API son: ${JSON.stringify(data)}`;
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
            dataContainer.innerHTML = 'Error al obtener datos de la API.';
        });
});
