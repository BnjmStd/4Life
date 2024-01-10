// narrowing

function mostrarLongitud(objeto: number | string) {
    if(typeof objeto == 'string') {
        return objeto.length
    }       
}


mostrarLongitud('1')


interface Mario {
    company: string,
    nombre: string,
    saltar: () => void
}

interface Sonic {
    company: string, 
    nombre: string, 
    correr: () => void
}


type Personaje = Mario | Sonic
// dejame comprobar
function CheckisSonic(personaje: Personaje) : personaje is Sonic {
    return (personaje as Sonic).correr != undefined
}

function jugar(personaje: Personaje) {
    if(CheckisSonic(personaje)) {
        personaje.correr()
        return
    }
}