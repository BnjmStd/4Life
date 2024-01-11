

// type from value

const gato = {
    planet: 'ear',
    bolitas: 'madrid'
}

type Adreesss =  typeof gato

// 
function createadress(){
    return {
        planet: 'asd',
        city: 'asdasd'
    }
}


type Adresss = ReturnType<typeof createadress>



// array

const languages:string[] = []
languages.push('')


type  CellValue = 'X' | 'O' | ''

type GameBoard  = [
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue],
    [CellValue, CellValue, CellValue]
]

const tresEnLinea: GameBoard = [
    ['X','O','X'],
    ['X','O','X'],
    ['X','O','X']
]


// tuplas
type RGB_ = [number, number, number]
const RGB:RGB_ = [255,255,0]