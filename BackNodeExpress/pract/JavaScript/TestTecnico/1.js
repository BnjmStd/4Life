export function obtenerDatosPromesa(callback){
    setTimeout(() => {
        callback(null, {data: 'datos'});
    }, 2000);
    }