const form = document.querySelector("#newform");


const msgError = document.getElementsByClassName("error")[0];


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
        resJson = await response.json();
        if (resJson.redirect){
            window.location.href = resJson.redirect;
            alert(resJson.message);
        }
    } else {
        const error = await response.json();
        msgError.textContent = error.message;
        return msgError.classList.toggle('escondido', false);
    } 
});
