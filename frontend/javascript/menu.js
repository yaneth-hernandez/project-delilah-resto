//mostrar productos obtenidos
async function mostrarProductos() {
    let respuestaBusqueda = await fetch('http://localhost:3020/delilah-resto/productos');
    let resultadoDatos = await respuestaBusqueda.json();

    return resultadoDatos
}
mostrarProductos()




function eventoClickCheckbox() {
    let inputCheckbox = document.getElementById("btn-menu1")
    inputCheckbox.addEventListener('change', (e) => {
        console.log(e.type)



        let crearPedido = obtenerValoresInput()
    })
}
window.addEventListener('load', eventoClickCheckbox)

function obtenerValoresInput() {
    //fetch
}