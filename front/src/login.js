const form = document.querySelector("#loginForm");

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma convencional

    const usernameInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='pwd']");

    const username = usernameInput.value;
    const password = passwordInput.value;

    const data = {
    username,
    password,
    };

    const response = await fetch("http://localhost:3000/api/cursos/programacion", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok){
        console.log("ok");
        console.log(response);
    } else {
        // El inicio de sesión ha fallado
        const error = await response.json();
        alert(error.message);
    }
});