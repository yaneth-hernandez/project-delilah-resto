function clickSelect(idPedido) {
    let select = document.querySelector('#estdo-' + idPedido)

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
    actualizarPedido(idPedido)

}

//listar producto
function irListarProducto() {
    let enlaceListar = document.querySelector("#listar-producto-id")
    enlaceListar.addEventListener('click', (e) => {
        e.preventDefault()
        window.open("./admin-listar-producto.html", "_self")
    })
}
window.addEventListener('load', irListarProducto)

//detalle de producto
function mostrarPantallaDatellePedido() {
    let overlayDetalle = document.getElementById('overlay-detalle-id')
    overlayDetalle.classList.add('active-detalle')
}

function ocultarPantallaDatellePedido() {
    let btonCierraDetalle = document.getElementById('icono-x-id')
    btonCierraDetalle.addEventListener('click', () => {
        let overlayDetalle = document.getElementById('overlay-detalle-id')
        overlayDetalle.classList.remove('active-detalle')
        limpiarPantallaDetalle()
    })
}
window.addEventListener('load', ocultarPantallaDatellePedido)

async function obtenerListarPedidos() {
    let url = backendEndpoints + '/pedidos'
    let respuestaFectch = await fetch(url);
    let resultJson = await respuestaFectch.json()

    return resultJson
}

async function actualizarPedido(idPedido) {
    let datosPedido = {
        id_pedido: idPedido,
        codigo_estatus: obtenerCodigoEstatus(idPedido)

    }
    let token = localStorage.getItem('Auht')
    let requestInitPedido = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "PUT",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(datosPedido)
    }
    try {
        let responsToFetch = await fetch(backendEndpoints + '/pedidos/' + idPedido, requestInitPedido)
        if (responsToFetch.ok) {
            let respuestaJson = await responsToFetch.json()

            console.log(respuestaJson)
        }
    } catch (err) {
        console.log(err)
    }
}

function obtenerCodigoEstatus(idPedido) {
    let estatusSeleccionado = document.querySelector("#estdo-" + idPedido)

    let edoNuevo = 'PD-01'
    let edoEnviado = 'PD-02'
    let edoConfirmado = 'PD-03'
    let edoPreparando = 'PD-04'
    let edoEntregado = 'PD-05'
    let edoCancelado = 'PD-100'
    let estadoEsperado = ''

    if (estatusSeleccionado.value == 'nuevo') { //cuando es nuevo
        estadoEsperado = edoNuevo
    } else if (estatusSeleccionado.value == 'enviado') { //cuando es enviado       
        estadoEsperado = edoEnviado
    } else if (estatusSeleccionado.value == 'confirmado') { //cuando es confirmado
        estadoEsperado = edoConfirmado
    } else if (estatusSeleccionado.value == 'preparando') { //cuando es preparando
        estadoEsperado = edoPreparando
    } else if (estatusSeleccionado.value == 'entregado') { //cuando es entregado
        estadoEsperado = edoEntregado
    } else if (estatusSeleccionado.value == 'cancelado') { //cuando es cancelado
        estadoEsperado = edoCancelado
    }

    return estadoEsperado
}

function cambiarEstatusSelect(codigoEstatusPedido) {
    let estatusAmostrar = ''

    if (codigoEstatusPedido === 'PD-01') {
        estatusAmostrar = 'nuevo-class'
    } else if (codigoEstatusPedido === 'PD-02') {
        estatusAmostrar = 'enviado-class'
    } else if (codigoEstatusPedido === 'PD-03') {
        estatusAmostrar = 'confirmado-class'
    } else if (codigoEstatusPedido === 'PD-04') {
        estatusAmostrar = 'preparado-class'
    } else if (codigoEstatusPedido === 'PD-05') {
        estatusAmostrar = 'entregado-class'
    } else if (codigoEstatusPedido === 'PD-100') {
        estatusAmostrar = 'cancelado-class'
    }

    return estatusAmostrar
}


async function mostrarListaPedidosHtml() {
    let sectionContenidoTablaPedidos = document.querySelector("#tabla-pedidos-id")

    let contenidoJson = await obtenerListarPedidos()
    for (let i = 0; i < contenidoJson.length; i++) {
        let PDnuevo = contenidoJson[i].codigo_estatus == 'PD-01' ? "selected " : ''
        let PDenviado = contenidoJson[i].codigo_estatus == 'PD-02' ? "selected " : ''
        let PDconfirmado = contenidoJson[i].codigo_estatus == 'PD-03' ? "selected " : ''
        let PDpreparando = contenidoJson[i].codigo_estatus == 'PD-04' ? "selected " : ''
        let PDentregado = contenidoJson[i].codigo_estatus == 'PD-05' ? "selected " : ''
        let PDcancelado = contenidoJson[i].codigo_estatus == 'PD-100' ? "selected " : ''


        let cambioClassSelect = cambiarEstatusSelect(contenidoJson[i].codigo_estatus)
        let contenidoTablaPedido = `<select onChange="clickSelect(${contenidoJson[i].id_pedido})" name="estado" class="${cambioClassSelect}" id="estdo-${contenidoJson[i].id_pedido}"
        <option value="" class="item-option seleccione-class" id="seleccione-${contenidoJson[i].id_pedido}">SELECCIONE</option>
        <option ${PDnuevo} value="nuevo" class="item-option" id="nuevo-${contenidoJson[i].id_pedido}">NUEVO</option>
        <option ${PDconfirmado} value="confirmado" class="item-option" id="confirmado-${contenidoJson[i].id_pedido}">CONFIRMADO</option>
        <option ${PDpreparando} value="preparado" class="item-option" id="preparado-${contenidoJson[i].id_pedido}">PREPARADO</option>
        <option ${PDenviado} value="enviado" class="item-option" id="enviado-${contenidoJson[i].id_pedido}">ENVIADO</option>
        <option ${PDcancelado} value="cancelado" class="item-option" id="cancelado-${contenidoJson[i].id_pedido}">CANCELADO</option>
        <option ${PDentregado}value="entregado" class="item-option" id="entregado-${contenidoJson[i].id_pedido}">ENTREGADO</option>
    </select>
        <div class="item-tabla" id="fecha-hora-${contenidoJson[i].id_pedido}">${contenidoJson[i].fecha_pedido}</div>
        <div class="item-tabla" id= "numero-pedido-${contenidoJson[i].id_pedido}">${contenidoJson[i].id_pedido}</div>
        <div class="item-tabla" id="item-tabla-pago-pedido-${contenidoJson[i].id_pedido}">
            <div class="tarjeta-icon" id="tarjeta-icon-${contenidoJson[i].id_pedido}"><em class="far fa-credit-card"></em></div>
            <div class="efectivo-icon" id="efectivo-icon-${contenidoJson[i].id_pedido}"><em class="fas fa-money-bill-wave"></em></div>
            <span class="pago-tabla" id="pago-tabla-${contenidoJson[i].id_pedido}">${contenidoJson[i].total_pago}</span>
        </div>
        <div class="item-tabla" id="nombre-usuario-${contenidoJson[i].id_pedido}">${contenidoJson[i].nombre_apellido}</div>
        <div class="item-tabla direccion-item" id="direccion-icon-${contenidoJson[i].id_pedido}"> <span class="seccion-direccion" id="seccion-direccion-${contenidoJson[i].id_pedido}">${contenidoJson[i].direccion}</span><button class="icon-menu" id="icon-menu-${contenidoJson[i].id_pedido}" onclick="mostrarPantallaDatellePedido(); obtenerDetallePedidoPorId(${contenidoJson[i].id_pedido})"><em class="fas fa-ellipsis-v"></em></button></div>
    </div>`

        let divPedidos = document.createElement('div')
        divPedidos.className = 'tabla-pedidos-items'
        divPedidos.id = `tabla-pedidos-items-${contenidoJson[i].id_pedido}`
        divPedidos.innerHTML = contenidoTablaPedido

        sectionContenidoTablaPedidos.append(divPedidos)
    }

}
mostrarListaPedidosHtml()

//detalle pedido

async function obtenerDetallePedidoPorId(idPedido) {
    let url = `http://127.0.0.1:3020/delilah-resto/pedidos/${idPedido}/status/`
    let respuestaFectchDetalle = await fetch(url);
    let resultJsonDetalle = await respuestaFectchDetalle.json(idPedido)

    mostrarHtmlDetallePedido(resultJsonDetalle)

}


async function mostrarHtmlDetallePedido(pedido) {
    let sectionDetallePedido = document.querySelector("#detalle-registro-pedido-id")
    let detallePedido = pedido.detalle
    let pedidoDetallado = pedido.Pedido
    let idPedido = pedido.Pedido[0].id_pedido


    for (let i = 0; i < detallePedido.length; i++) {
        let rutaImg = backendEndpoints + '/productos/imagenes?name=' + detallePedido[i].imagen
        let detallePedidoStatus = `<div class="content-pedido" id="contenedor-pedidos-${idPedido}">
            <div class="plato-img-pedido" id="plato-img-detalle-pedido-${idPedido}">
                <img src="${rutaImg}" alt="plato" class="img-menu" id="img-menu-detalle-${idPedido}">
                <p class="product-precio" id="product-precio-detalle-${idPedido}"><span class="texto-label" id="texto-label-detalle-${idPedido}">${detallePedido[i].nombre}</span><span class="precio" id="precio-detalle-${idPedido}">${detallePedido[i].precio_producto},00</span></p>
            </div>
          </div>`


        //detalle productos
        let divDetallePedido = document.createElement('div')
        divDetallePedido.className = 'contenido-detalle-pedido'
        divDetallePedido.id = 'contenido-detalle-pedido-id'
        divDetallePedido.innerHTML = detallePedidoStatus
        sectionDetallePedido.append(divDetallePedido)
    }
    //pago total
    obtenerPagoTotalPedido(idPedido, pedidoDetallado[0].total_pago)

    //estado del pedido en detalle de pedido
    obtenerEdoPedidoDetalle(pedidoDetallado[0].codigo_estatus)

    //forma de pago
    obtenerFormaPago(pedidoDetallado[0].codigo_forma_pago)

    //dirección
    obtenerDireccion(pedidoDetallado[0].direccion, pedidoDetallado[0].nombre_apellido, pedidoDetallado[0].telefono)

}

function obtenerPagoTotalPedido(idPedido, totalPago) {
    let sectionDetallePedido = document.querySelector("#detalle-registro-pedido-id")

    let pagoTotal = `<input type = "text" class = "input-detalle" id = "precio-total-${idPedido}" readonly value = "Total Pago = ${totalPago},00" >`
    let divPago = document.createElement('div')
    divPago.className = 'contenedor-pago'
    divPago.id = 'contenedor-pago-id'
    divPago.setAttribute('data-idPedido', idPedido)
    divPago.innerHTML = pagoTotal
    sectionDetallePedido.append(divPago)

}

//estado del pedido en detalle de pedido
function obtenerEdoPedidoDetalle(estadoPedido) {
    //son labels
    let edoNuevo = document.getElementsByName("nuevo")[0]
    let edoConfirmado = document.getElementsByName("confirmado")[0]
    let edoPreparando = document.getElementsByName("preparando")[0]
    let edoEnviado = document.getElementsByName("enviado")[0]
    let edoEntregado = document.getElementsByName("entregado")[0]
    let edoCancelado = document.getElementsByName("cancelado")[0]
    let fondoInactiv = "#c8c3c1"
    let letraInactiv = "#9b8f8b"


    if (estadoPedido === 'PD-01') { //cuando es nuevo
        edoConfirmado.style.background = fondoInactiv
        edoConfirmado.style.color = letraInactiv
        edoPreparando.style.background = fondoInactiv
        edoPreparando.style.color = letraInactiv
        edoEnviado.style.background = fondoInactiv
        edoEnviado.style.color = letraInactiv
        edoEntregado.style.background = fondoInactiv
        edoEntregado.style.color = letraInactiv
        edoCancelado.style.background = fondoInactiv
        edoCancelado.style.color = letraInactiv
    } else if (estadoPedido === 'PD-02') { //cuando es enviado       
        edoNuevo.style.background = fondoInactiv
        edoNuevo.style.color = letraInactiv
        edoConfirmado.style.background = fondoInactiv
        edoConfirmado.style.color = letraInactiv
        edoPreparando.style.background = fondoInactiv
        edoPreparando.style.color = letraInactiv
        edoEntregado.style.background = fondoInactiv
        edoEntregado.style.color = letraInactiv
        edoCancelado.style.background = fondoInactiv
        edoCancelado.style.color = letraInactiv
    } else if (estadoPedido === 'PD-03') { //cuando es confirmado
        edoNuevo.style.background = fondoInactiv
        edoNuevo.style.color = letraInactiv
        edoPreparando.style.background = fondoInactiv
        edoPreparando.style.color = letraInactiv
        edoEnviado.style.background = fondoInactiv
        edoEnviado.style.color = letraInactiv
        edoEntregado.style.background = fondoInactiv
        edoEntregado.style.color = letraInactiv
        edoCancelado.style.background = fondoInactiv
        edoCancelado.style.color = letraInactiv
    } else if (estadoPedido === 'PD-04') { //cuando es preparando
        edoNuevo.style.background = fondoInactiv
        edoNuevo.style.color = letraInactiv
        edoConfirmado.style.background = fondoInactiv
        edoConfirmado.style.color = letraInactiv
        edoEnviado.style.background = fondoInactiv
        edoEnviado.style.color = letraInactiv
        edoEntregado.style.background = fondoInactiv
        edoEntregado.style.color = letraInactiv
        edoCancelado.style.background = fondoInactiv
        edoCancelado.style.color = letraInactiv
    } else if (estadoPedido === 'PD-05') { //cuando es entregado
        edoNuevo.style.background = fondoInactiv
        edoNuevo.style.color = letraInactiv
        edoConfirmado.style.background = fondoInactiv
        edoConfirmado.style.color = letraInactiv
        edoPreparando.style.background = fondoInactiv
        edoPreparando.style.color = letraInactiv
        edoEnviado.style.background = fondoInactiv
        edoEnviado.style.color = letraInactiv
        edoCancelado.style.background = fondoInactiv
        edoCancelado.style.color = letraInactiv
    } else if (estadoPedido === 'PD-100') { //cuando es cancelado
        edoNuevo.style.background = fondoInactiv
        edoNuevo.style.color = letraInactiv
        edoConfirmado.style.background = fondoInactiv
        edoConfirmado.style.color = letraInactiv
        edoPreparando.style.background = fondoInactiv
        edoPreparando.style.color = letraInactiv
        edoEnviado.style.background = fondoInactiv
        edoEnviado.style.color = letraInactiv
        edoEntregado.style.background = fondoInactiv
        edoEntregado.style.color = letraInactiv
    }
}

function obtenerFormaPago(formaPago) {
    let modoPago = document.getElementById('pago-registrado-detalle-id')

    if (formaPago === 'PGO-01') {
        modoPago.value = 'EFECTIVO'
    } else {
        modoPago.value = 'TARJETA'
    }
}

function obtenerDireccion(direccion, usuario, telefono) {
    let direccionPedido = document.getElementById('direccion-detalle-id')
    let usuarioPedido = document.getElementById('nom-admin-id')
    let telefonoPedido = document.getElementById('tel-admin-id')

    if (direccion != null || usuario != null || telefono != null) {
        direccionPedido.value = direccion
        usuarioPedido.value = usuario
        telefonoPedido.value = telefono
    } else {
        alert('Datos no encontrados')
    }
}

function limpiarPantallaDetalle() {
    let contenedorSection = document.getElementById('principal-id')
    let contenidoPlantilla = `<section class="detalle-registro" id="detalle-registro-pedido-id">
    <h3 class="titulo-detalle">Detalle</h3></section>
    <section class="edo-pedido">
    <h2 class="titulo-estado">Estado</h2>
    <div class="form-estado">
        <label name="nuevo" class="text-estado" id="estado-nuevo-id">NUEVO</label>
        <label name="confirmado" class="text-estado" id="estado-confirmado-id">CONFIRMADO</label>
        <label name="preparando" class="text-estado" id="estado-preparado-id">PREPARANDO</label>
        <label name="enviado" class="text-estado" id="estado-enviado-id">ENVIADO</label>
        <label name="entregado" class="text-estado" id="estado-entregado-id">ENTREGADO</label>
        <label name="cancelado" class="text-estado" id="estado-cancelado-id">CANCELADO</label>
    </div>
</section>
<section class="datos-detalle">
    <div class="pago">
        <h4 class="titulo-detalle">Forma de pago</h4>
        <div class="form-pago">
            <input type="text" data-formpago="" readonly value="" class="pago-registrado" id="pago-registrado-detalle-id">
        </div>
    </div>
    <div class="direccion">
        <h5 class="titulo-detalle">Dirección</h5>
        <input type="text" class="input-detalle" id="direccion-detalle-id" readonly value="" data-direccion="">
    </div>

    <div class="direccion">
        <h6 class="titulo-detalle">Usuario</h6>
        <div class="nom-usu">
            <input type="text" class="input-detalle" id="nom-admin-id" readonly value="" data-direccion="">
        </div>
        <div class="email-tel">
            <input type="tel" class="input-detalle" id="tel-admin-id" readonly value="" data-direccion="">
        </div>
    </div>
</section>`
    contenedorSection.innerHTML = contenidoPlantilla
}

function clickCancelarOrden() {
    let btonCancelarOrden = document.querySelector("#cancelar-id")
    btonCancelarOrden.addEventListener('click', () => {
        cancelarPedido()
    })
}
window.addEventListener('load', clickCancelarOrden)

async function cancelarPedido() {
    let idPedidoData = document.querySelector("#contenedor-pago-id").dataset.idpedido
    let eliminarPedido = await fetchCancelarPedido(idPedidoData)
    if (eliminarPedido != null && eliminarPedido.Code === 100) {
        let contenedorPedido = document.querySelector(`#tabla-pedidos-items-${idPedidoData}`)
        contenedorPedido.remove()
        let overlayDetalle = document.getElementById('overlay-detalle-id')
        overlayDetalle.classList.remove('active-detalle')
    } else {
        alert('Problemas al borrar pedido')
    }
}

async function fetchCancelarPedido(idPedido) {
    let token = localStorage.getItem('Auht')
    let requestInitPedido = {
        method: 'DELETE',
        headers: { "Authorization": "Bearer " + token },
        body: idPedido
    }
    try {
        let responsToFetch = await fetch(backendEndpoints + '/pedidos/' + idPedido, requestInitPedido)
        if (responsToFetch.ok) {
            let respuestaJson = await responsToFetch.json()

            console.log(respuestaJson)
            return respuestaJson
        }
    } catch (err) {
        console.log(err)
    }
}