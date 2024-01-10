function ordenarProducto(producto) {
    return new Promise((resolve, reject) => {
        console.log(`Ordenando: ${producto} de freeCamp`);
        setTimeout(() => {
            if (producto === 'taza') {
                resolve('Ordenando una taza');
            } else {
                reject('Error');
            }
        }, 2000);
    });
}

function procesarPedido(response){
    return new Promise((resolve) => {
        console.log('Procesando respuesta');
        console.log(`La respuesta es: "${response}"`);
        setTimeout(() => {
            resolve('Gracias por tu compra');
        }, 4000);
    });
}

/* ordenarProducto('taza')
    .then(response => {
        console.log('respuesta');
        return procesarPedido(response);
    })
    // realizamos un proceso con esta nueva promesa
    .then(respuestaProcesada => {
        console.log(respuestaProcesada);
    })
    .catch(error => {
        console.log(error);
    })
*/

async function relizarPedido(producto) {
    try {
        const respuesta = await ordenarProducto(producto);
        console.log('respuesta recibida');
        console.log(respuesta);
        const respuestaProcesada = await procesarPedido(respuesta);
        console.log(respuestaProcesada);
    } catch (error) {
        console.log(error);
        
    }
}

relizarPedido('taza');