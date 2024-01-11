

// enums

const enum Error_types{  // Colección de datos finita
    NOT_FOUND = 'not found',
    UNAUTHORIZED = 'asd',
    FORBIDDEN = 'asdasd'
}

function mostrarMensaje (tipoDeError: Error_types) {
    if (tipoDeError === Error_types.NOT_FOUND){
        console.log(`no se encuentra el recurso ${tipoDeError}`)
    } else if(tipoDeError === Error_types.UNAUTHORIZED){
        console.log(`no se encuentra el recurso ${tipoDeError}`)
    }else if(tipoDeError === Error_types.FORBIDDEN){
        console.log(`no se encuentra el recurso ${tipoDeError}`)
    }
}




// aserciones de tipo
