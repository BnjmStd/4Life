// URL de la API que proporciona datos de usuarios (JSONPlaceholder)
const apiUrl = 'http://localhost:8000/';

// Función para realizar la solicitud a la API y procesar la respuesta
async function fetchData() {
  try {
    // Realizar la solicitud GET utilizando fetch()
    const response = await fetch(apiUrl);

    // Verificar si la solicitud fue exitosa (código de estado HTTP 200-299)
    if (response.ok) {
      // Convertir la respuesta a formato JSON
      const data = await response.json();

      // Procesar los datos obtenidos (en este caso, mostraremos los datos en la consola)
      console.log('Datos de usuarios:', data);
    } else {
      // Si la respuesta no fue exitosa, mostrar un mensaje de error
      console.error('Error al obtener los datos:', response.statusText);
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Se produjo un error en la conexión a la api:', error);
  }
}

// Llamar a la función fetchData para iniciar la solicitud a la API
fetchData();