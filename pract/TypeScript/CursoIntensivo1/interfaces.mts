interface Heroe {
    id: string
    name: string
    age: number
    saludar: () => void
}

const hero: Heroe = {
    id: '1',
    name: 'spiderman',
    age: 30,
    saludar: () => {
        console.log('hola')
    }
}


////////////////////////////
interface Producto {
    id: number
    nombre: string
    precio: number
    quantity: number
}

interface CarritoCompras {
    totalPrice: number
    producto: Producto[] 
}

const carrito: CarritoCompras = {
    totalPrice: 100,
    producto: [
        {
            id: 1,
            nombre: 'producto 1',
            precio: 100,
            quantity: 1
        }
    ]
}


// extender interfaces |

interface Zapatilla extends Producto {
    talla: number
}



interface CarritoOps {
    add(product: Producto): void,
    remove(prodcut: Producto): void,
    clear(): void
}