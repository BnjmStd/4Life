async function fetching() {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "GET",
        });
    
        if (response.ok) {
            // Si la respuesta es exitosa, simplemente redirige a la nueva página
            return window.location.href = "http://localhost:3000/login";
        } else {
            // Si hay un error en la respuesta, muestra el mensaje de error
            const error = await response.json();
            return error();
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
};

document.getElementById('loginButton').addEventListener('click', function() {
    fetching();
});

document.getElementById('regis').addEventListener('click', function() {
    fetching();
});

