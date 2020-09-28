function volver() {
    let btonVolver = document.getElementById('volver-id')
    btonVolver.addEventListener('click', () => {
        window.location = 'http://127.0.0.1:5500/frontend/admin.html'
    })
}
window.addEventListener('load', volver)

//cargar producto
function irCargarProducto() {
    let btonCargar = document.querySelector("#cargar-listar-producto-id")
    btonCargar.addEventListener('click', () => {
        mostrarCargarProducto()
    })
}
window.addEventListener('load', irCargarProducto)

function mostrarCargarProducto() {
    let overlay = document.getElementById('overlay-cargar-id')
    overlay.classList.add('active-cargar')
}

function cerrarCargarProducto() {
    let btonCerarPopup = document.getElementById('cerrar-popup-id')
    btonCerarPopup.addEventListener('click', () => {
        let overlay = document.getElementById('overlay-cargar-id')
        overlay.classList.remove('active-cargar')
    })
}
window.addEventListener('load', cerrarCargarProducto)


function abrirEditarBorrar() {
    let btonEditBorr = document.querySelector("#edita-borrar-id")
    btonEditBorr.addEventListener('click', () => {
        let overly = document.getElementById('overlay-id')
        overly.classList.add('active')
    })
}
window.addEventListener('load', abrirEditarBorrar)


function cerrarEditBorrar() {
    let btonCerrar = document.getElementById('icono-cab-id')
    btonCerrar.addEventListener('click', () => {
        let overly = document.getElementById('overlay-id')
        overly.classList.remove('active')
    })
}
window.addEventListener('load', cerrarEditBorrar)

function cargarProducto() {
    let btnEnviarReg = document.querySelector("#enviar-cargar-id")
    btnEnviarReg.addEventListener('click', () => {
        let nombreProducto = document.querySelector("#nom-prod-cargar-id").value
        let descripcionProducto = document.querySelector("#des-prod-cargar-id").value
        let imagenProducto = document.querySelector("#img-admin-cargar-id").files
        let precioProducto = document.querySelector("#precio-admin-cargar-id").value

        crearProductos(nombreProducto, descripcionProducto, imagenProducto, precioProducto)
        alert('Producto creado')
        limpiarFormulario()
    })

}
window.addEventListener('load', cargarProducto)