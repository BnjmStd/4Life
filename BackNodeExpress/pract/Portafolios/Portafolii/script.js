function scrollToElement(elementSelector, instance = 0){
    const element = document.querySelector(elementSelector);

    if (element){
        element.scrollIntoView({ behavior: 'smooth'});
    }
}

// Obtener las referencias a los enlaces por su ID
const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

// Agregar event listeners a los enlaces
link1.addEventListener('click', () => {
    scrollToElement('.header');
});

link2.addEventListener('click', () => {
    scrollToElement('.column', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.footer');
});