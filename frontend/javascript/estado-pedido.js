async function cargarPagina() {
    let idPedido = obtenerPedidoLocal()
    console.log(idPedido)
    let respFetch = await obtenerPedido(idPedido)
    montrarElementosHtml(respFetch)

}
cargarPagina()

function obtenerPedidoLocal() {
    let existePedido = ''
    let idPedido = ''
    if (existePedido == -1) {
        alert('Debe seleccionar su pedido')
        window.location.replace('http://127.0.0.1:5500/frontend/menu.html')
    } else {
        idPedido = localStorage.getItem('order')
    }
    return idPedido
}

function irMenuUsuarioReg() {
    let btonSeguirPidiendo = document.querySelector("#crear-cta-id")
    btonSeguirPidiendo.addEventListener('click', () => {
        window.location.replace('http://127.0.0.1:5500/frontend/menu.html')
        localStorage.removeItem('order')
    })
}
window.addEventListener('load', irMenuUsuarioReg)

function clickEstadosPedido() {
    let formulario = document.querySelector("#form-estado-id")
    formulario.addEventListener('change', (e) => {
        let evento = e.target.value
        console.log(evento)
    })
}
window.addEventListener('load', clickEstadosPedido)

async function obtenerPedido(id) {
    let urlId = `http://localhost:3020/delilah-resto/pedidos/${id}/status`
    let busqueda = await fetch(urlId)
    let respuesta = await busqueda.json()

    return respuesta
}

function montrarElementosHtml(pedido) {
    let elementoConfirm = document.querySelector("#btn-confirm")
    let elementoPrep = document.querySelector("#btn-prepar")
    let elementoEnCamino = document.querySelector("#btn-camino")
    let elementoEntregado = document.querySelector("#btn-entregado")
    let respuestaEstado = pedido.Pedido[0].codigo_estatus

    if (respuestaEstado == 'PD-01') {
        elementoConfirm.checked = true
    } else if (respuestaEstado == 'PD-02') {
        elementoPrep.checked = true
    } else if (respuestaEstado == 'PD-03') {
        elementoEnCamino.checked = true
    } else if (respuestaEstado == 'PD-04') {
        elementoEntregado.checked = true
    }

    let sectionForm = document.querySelector("body > main > section.formulario-registro")
    let itemPedido = pedido.detalle
    for (let i = 0; i < itemPedido.length; i++) {
        let rutaImg = 'http://127.0.0.1:3020/delilah-resto/productos/imagenes?name=' + itemPedido[i].imagen
        let detallePedido = `<div class="plato-img">
        <img src=${rutaImg} alt="plato" class="img-menu">
        <p class="product-precio"><span class="texto-label">${itemPedido[i].nombre}</span><span class="precio">${itemPedido[i].precio_producto}</span></p></div>`

        let crearDiv = document.createElement('div')
        crearDiv.className = 'content-menu'
        crearDiv.innerHTML = detallePedido
        sectionForm.append(crearDiv)
    }

    let elementoPagoTotal = document.querySelector("#total-id")
    elementoPagoTotal.value = 'Total:' + pedido.Pedido[0].total_pago

    let formaPgo = pedido.detalle[0].codigo_forma_pago
    let elementoPgo = document.querySelector("#forma-pago")

    if (formaPgo == 'PGO-01') {
        elementoPgo.value = 'Efectivo'
    } else {
        elementoPgo.value = 'Tarjeta'
    }
    let elementoDireccion = document.querySelector("#direccion-id")
    elementoDireccion.value = pedido.Pedido[0].direccion
}