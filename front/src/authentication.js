const msgError2 = document.getElementsByClassName("error2")[0];
const msgError = document.getElementsByClassName("error")[0];

async function fetchAPI(url, options) {
    try {
        const response = await fetch(url, options);
        return response 
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailInput = document.querySelector("input[name='email']").value;
    const passwordInput = document.querySelector("input[name='pwd']").value;

    const url = 'http://localhost:3000/api/login'
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({emailInput, passwordInput}),
    };

    const response = await fetchAPI(url, options);

    if (response.ok){
        const res = await response.json();
        window.location.href = res.redirect;
    } else {
        const res = await response.json();
        msgError2.textContent =  res.message;
        return msgError2.classList.toggle('escondido', false);
    } 
});

document.querySelector("#newform").addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const mailInput = document.querySelector("input[name='emailR']");
    const passwordInput = document.querySelector("input[name='pwdR']");
    const passwordRepeatInput = document.querySelector("input[name='pwd2']");

    const mail = mailInput.value;
    const password = passwordInput.value;
    const password2 = passwordRepeatInput.value;


    const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({mail, password, password2}),
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
