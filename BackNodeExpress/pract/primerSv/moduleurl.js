const muURL = new URL('https://www.ejemplos.org/cursos/programacion?ordenar=vistas&nivel=1');

console.log(muURL.hostname);
console.log(muURL.pathname);
console.log(muURL.searchParams);
console.log(typeof muURL.searchParams);
console.log(muURL.searchParams.get('ordenar'));
