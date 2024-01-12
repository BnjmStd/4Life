
const msgError2 = document.getElementsByClassName("error2")[0];

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("input[name='email']").value;
    const passwordInput = document.querySelector("input[name='pwd']").value;

    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({emailInput, passwordInput}),
    });
    if (response.ok){
        resJson = await response.json();
        if (resJson.redirect){
            window.location.href = resJson.redirect;
        }
    } else {
        const error = await response.json();
        msgError2.textContent = error.message;
        return msgError2.classList.toggle('escondido', false);
    } 

});
