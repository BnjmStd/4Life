

const statusPedido = () => {
    return  Math.random() < 0.8;
};

const MiPedidoPizza = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(statusPedido()) {
            resolve('Pedido exitoso');
        } else {
            reject('ocurrio un error');
        }
    }, 2000);
});

/* const manejarPedido = (mensajeConfirm) => {
    console.log(mensajeConfirm);
}

const rechazadaPed = (msgRecha) => {
    console.log(msgRecha);
}

*/

MiPedidoPizza
    .then((mensajeConfirm) => {
        console.log(mensajeConfirm);
    })
    .then(null, (msgRecha) => {
        console.log(msgRecha);
    })
    .catch((msgRecha) => {
        console.log(msgRecha);
    });