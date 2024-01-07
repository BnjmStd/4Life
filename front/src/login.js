document.getElementById('formlogin').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    


    
    // Capturando los datos del formulario
    let nombre = document.getElementById('name').value;
    let email = document.getElementById('pwd').value;
    
    // Aquí puedes utilizar los datos capturados
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    
    // También puedes realizar otras acciones, como enviar los datos a un servidor
  });