
// logra tipear funciones
function saludar({name, age}: {name:string, age:string}): string{
    console.log(`hola  ${name} ${age}`)
    return name
}

saludar({ name: "star", age: "asd"})



// utilizar funciones como parámetros
const holafromfunction = (fn: (name: string) => void ) => {
    fn('Miguel')
}

const sayhi = (name:string) => {
    console.log(`hola ${name}`)
}

holafromfunction(sayhi)


// tipas arrow function


const sumar = (a: number, b: number): number => {
    return a + b
}


const restar: (a:number, b: number) => number = (a, b) => {
    return a - b
}

function throwError(message: string): never {
    throw new Error(message)
}




const avengers = ['spider', 'hulk', 'capitan']

avengers.forEach(avengers => {
    console.log(avengers.toUpperCase())
})

// Objetos

// type alias

// optional properties

type HeroId = `${string}-${string}-${string}-${string}-${string}`


type Hero = {
    readonly id?: HeroId
    name: string
    age: number
    isActive?: boolean
}

let hero: Hero = {
    name: 'thor',
    age: 1500
};

function createHero(hero: Hero): Hero {
    const { name, age } = hero
    return { id: crypto.randomUUID(), name, age, isActive: true }
}

const thor = createHero({ name: 'Thor', age: 1500 })
console.log (thor.isActive)

thor.id?.toString()

// thor.id = 218378127381723213
// type hero = heroBasicInfo & heroPropertis                    