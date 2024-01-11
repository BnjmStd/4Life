const apiURL = "https://rickandmortyapi.com/api/character";

function makeCardOriginal(character){
    const {name, status, image} = character;
    const cardsContainer = document.querySelector(".cards-container");
    const title = document.createElement("h5");
    title.textContent = name;
    const characterStatus = document.createElement("p");
    characterStatus.textContent = status;
    if(status == 'Alive') characterStatus.style.color = "green";
    else characterStatus.style.color = "gray";

    const characterImage = document.createElement("img");
    characterImage.src = image;
    characterImage.width = 200;
    


    const Card = document.createElement("div");
    Card.appendChild(title);
    Card.appendChild(characterStatus);
    Card.appendChild(characterImage);
    Card.style.backgroundColor = "blue";

    cardsContainer.appendChild(Card);
}

function makeCard (character) {
    const { name } = character;
    const cardsContainer = document.querySelector(".cards-container");

    const title = document.createElement("h5");
    title.textContent = name;

    cardsContainer.append(title);

}

async function getCharacter() {

    try {
        const response = await fetch(apiURL,{
            method: "GET",
        });
    
        console.log(`response: ${response}`)
    
        // const character = await response.json()
        const { results } = await response.json();

        //console.log(`psnoje: ${character}`)
        //console.log(character)

        for (let index = 0; index < results.length; index++) {
            makeCard(results[index])
            
        }
        
    
    } catch (error) {
        console.log(error.message);
    }


}


getCharacter();