const form = document.querySelector("#newform");

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
    // Evita que el formulario se envíe de forma convencional
    
    const usernameInput = document.querySelector("input[name='emailR']");
    const passwordInput = document.querySelector("input[name='pwdR']");
    const passwordRepeatInput = document.querySelector("input[name='pwd2']");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const password2 = passwordRepeatInput.value;

    
    const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, password2}),
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
