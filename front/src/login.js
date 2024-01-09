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

    /*const response = await fetch("http://127.0.0.1:8000/test_conexion", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok){
        console.log("ok");
    } else {
        // El inicio de sesión ha fallado
        const error = await response.json();
        alert(error.message);
    }*/
    console.log(data);
});