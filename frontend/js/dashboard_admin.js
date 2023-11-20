document.addEventListener('DOMContentLoaded', function() {
    const usersContainer = document.getElementById('users-container');
    
    // Función para cargar usuarios desde la API
    function cargarUsuarios() {
      fetch('http://127.0.0.1:8000/db') 
        .then(response => response.json())
        .then(data => {
          // Mostrar los usuarios en el contenedor
          usersContainer.innerHTML = ''; // Limpiar contenido anterior
          data.forEach(user => {
            const userElement = document.createElement('div');
            userElement.innerHTML = `${JSON.stringify(user)}`; // Ejemplo: Mostrar nombre y correo
            usersContainer.appendChild(userElement);
          });
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
    }
  
    // Cargar usuarios al hacer clic en el enlace "Inicio" del menú
    const linkInicio = document.querySelector('.sidebar .nav-link:first-child');
    linkInicio.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar comportamiento predeterminado del enlace
      cargarUsuarios(); // Llama a la función para cargar usuarios desde la API
    });
  });
  