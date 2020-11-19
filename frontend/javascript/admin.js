function clickSelect() {
    let select = document.querySelector("#estdo-id")
    select.addEventListener('change', (e) => {
        if (select.value == 'confirmado') {
            select.className = 'confirmado-class'
        } else if (select.value == 'nuevo') {
            select.className = 'nuevo-class'
        } else if (select.value == 'preparado') {
            select.className = 'preparado-class'
        } else if (select.value == 'enviado') {
            select.className = 'enviado-class'
        } else if (select.value == 'cancelado') {
            select.className = 'cancelado-class'
        } else if (select.value == 'entregado') {
            select.className = 'entregado-class'
        } else if (select.value == "") {
            select.className = 'item-option'
        }
    })
}
window.addEventListener('load', clickSelect)

//listar producto
function irListarProducto() {
    let enlaceListar = document.querySelector("#listar-producto-id")
    enlaceListar.addEventListener('click', (e) => {
        e.preventDefault()
        window.open("http://127.0.0.1:5500/frontend/admin-listar-producto.html", "_self")
    })
}
window.addEventListener('load', irListarProducto)

//detalle de producto
function verDatellePedido() {
    let btonIconDetalle = document.getElementById('icon-menu-id')
    btonIconDetalle.addEventListener('click', () => {
        let overlayDetalle = document.getElementById('overlay-detalle-id')
        overlayDetalle.classList.add('active-detalle')
    })
}
window.addEventListener('load', verDatellePedido)

function ocultarDatellePedido() {
    let btonCierraDetalle = document.getElementById('icono-x-id')
    btonCierraDetalle.addEventListener('click', () => {
        let overlayDetalle = document.getElementById('overlay-detalle-id')
        overlayDetalle.classList.remove('active-detalle')
    })
}
window.addEventListener('load', ocultarDatellePedido)