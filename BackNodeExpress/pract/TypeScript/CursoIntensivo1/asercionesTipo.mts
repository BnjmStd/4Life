


const canvas =  document.getElementById('canvas')
// null si no lo encuentra
// HTMLElement si lo encuentra
// nosotros necesitamos un tipo más específico, tenemos que indicarle 

// como sabe typescript qe realmente estas busccando un elemento canvas.
// no funciona en time de ejecución


// La aserción lo hagas después de la comprobación
if (canvas != null && canvas instanceof HTMLCanvasElement){
    const ctx = canvas.getContext('2d')
}


// typeof -> para tipos
// instanceof -> para instancias

const API_URL = "https://api.github.com/search/repositories?q=javascript"
const response = await fetch(API_URL)

if (!response.ok){
    throw new Error('Request failed')
}

type APIResponse = {
    items: object[]
}

const data = await response.json() 

// para tipear usar https://app.quicktype.io/

const repos = data.item.map(repo => {
    console.log(repo)
})