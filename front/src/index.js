document.getElementById('loginButton').addEventListener('click', async function() {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "GET",
        });
    
        if (response.ok) {
            // Si la respuesta es exitosa, simplemente redirige a la nueva página
            window.location.href = "http://localhost:3000/login";
        } else {
            // Si hay un error en la respuesta, muestra el mensaje de error
            const error = await response.json();
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});