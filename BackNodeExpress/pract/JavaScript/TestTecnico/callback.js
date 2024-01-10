
// const names = ['javier', 'edu', 'benja', 'bea']
const names = []

function getData(){
    return new Promise((resolve, reject) => {
        if (names.lenght == 0) {
            reject(new Error('data empty'))
        }

        setTimeout(() => {
            resolve(names)
        },2000)
    })
}

getData()
    .then((response) => console.log(response))
    .catch((err) => console.log(err.message))


async function fetchingData() {
    const  books = await getData()
}
