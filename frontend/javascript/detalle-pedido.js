async function cargarContenidPagina() {
    let productos = obtenerProductoLocal()
    let sumaTotalPedido = 0

    for (const item of productos) {
        let producto = await buscarProductoFetch(item)
        let objectResult = new ProductosClass(producto[0]);

        sumaTotalPedido += objectResult.precio
        mostrarPedidoHtml(objectResult)
    }

    //mostrar suma sumaTotalPedido
    let precioTotal = document.querySelector("#total-id")
    precioTotal.value = `Total: $${sumaTotalPedido}`
    precioTotal.dataset.precio = sumaTotalPedido

    //buscar dirección usuario
    let usuario = await buscarUsuario()
    let elementoDireccionUsuario = document.querySelector('#direccion-id')
    elementoDireccionUsuario.value = usuario[0].direccion

}

async function buscarUsuario() {
    let url = backendEndpoints + '/usuarios/sesion/verify'
    let token = localStorage.getItem('Auht')
    let reqInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "GET",
            "Authorization": "Bearer " + token
        }
    }
    let respuestaFectch = await fetch(url, reqInit);
    let resultJson = await respuestaFectch.json()

    if (resultJson != null && resultJson.code == -100) {
        alert('Su sesión ha expirado')
        localStorage.removeItem('Auht')
        window.location.replace('./login.html')

    } else {
        return resultJson
    }

}

function removerMostrarProducto(id) {
    let nombreKey = `usuario-${id}:prod_${id}`
    let guardado = localStorage.getItem(nombreKey)

    let precioProducto = document.querySelector(`#precio-id${id}`).dataset.precio

    if (guardado == null) {
        let check = document.querySelector(`#label-id${id}`)
        check.className = 'btn-menu-check'
        check.textContent = 'x'
        actualizarPrecioTotal(precioProducto)
        localStorage.setItem(nombreKey, id)
    } else {
        let check = document.querySelector(`#label-id${id}`)
        check.className = 'btn-menu'
        check.textContent = '+'
        actualizarPrecioTotal(-1 * precioProducto)
        localStorage.removeItem(nombreKey)
    }
}

function actualizarPrecioTotal(precioProducto) {
    let elementoPrecioTotal = document.querySelector("#total-id")
    let precioTotal = parseInt(elementoPrecioTotal.dataset.precio) + parseInt(precioProducto)
    elementoPrecioTotal.value = `Total: $ ${precioTotal}`
    elementoPrecioTotal.dataset.precio = precioTotal

    return precioTotal
}

function obtenerProductoLocal() {
    let productoLocalArray = []
    for (let i = 0; i < localStorage.length; i++) {
        let productoLocaleStarage = localStorage.key(i);
        let existe = localStorage.key(i).indexOf(':prod_');
        if (existe != -1) {
            let idProducto = localStorage.getItem(productoLocaleStarage)
            productoLocalArray.push(idProducto)
        }
    }
    return productoLocalArray
}

async function buscarProductoFetch(id) {
    let urlId = 'http://localhost:3020/delilah-resto/productos/' + id
    let busqueda = await fetch(urlId)
    let respuesta = await busqueda.json(id)

    return respuesta
}

class ProductosClass {
    constructor(obj) {
        this.id = obj.id_productos;
        this.nombre = obj.nombre;
        this.imagen = obj.imagen;
        this.precio = obj.precio;
        this.stock = obj.estado;

    }
}

function mostrarPedidoHtml(producto) {
    let sectionForm = document.getElementById('contenedor-items-id')
    let nombreClase = ''
    let seleccionValor = ''
    let existenciaPedido = obtenerProductoLocal()

    if (existenciaPedido == null) {
        nombreClase = 'btn-menu'
        seleccionValor = '+'

    } else {
        nombreClase = 'btn-menu-check'
        seleccionValor = 'x'
    }
    let rutaImg = backendEndpoints + '/productos/imagenes?name=' + producto.imagen
    let detallePedido = ` <div class="plato-img" id="plato-img-id${producto.id}">
    <img src="${rutaImg}" alt="plato" class="img-menu" id="img-menu-id${producto.id}">
    <p class="product-precio"><span class="texto-label" id="texto-label-id${producto.id}">${producto.nombre}</span>
    <span class="precio" id="precio-id${producto.id}" data-precio="${producto.precio}"  >$ ${producto.precio}</span></p>
</div>
<div class="contenedor-checheck">
   
    <label id="label-id${producto.id}" class="${nombreClase}" for="btn-menu${producto.id}" 
    onclick = "removerProducto(${producto.id})" >${seleccionValor}</label>
   
</div>`

    let crearDiv = document.createElement('div')
    crearDiv.className = 'content-menu'
    crearDiv.id = `content-menu-id${producto.id}`
    crearDiv.innerHTML = detallePedido
    sectionForm.append(crearDiv)
}

function valorFormaPago() {
    let formaPago = document.querySelector("#selec-pago-id").selectedOptions[0].dataset.pago

    return formaPago
}

function seleccionFormaPago() {
    let formaPago = document.querySelector("#selec-pago-id")
    formaPago.addEventListener('change', (e) => {
        const resultado = document.querySelector('.resultado');
        resultado.textContent = `Pago con: ${e.target.value} registrado`
    })
}
window.addEventListener('load', seleccionFormaPago)

function borrarProductoLocal() {
    for (let i = localStorage.length - 1; i > -1; i--) {
        let productoLocaleStarage = localStorage.key(i);
        let existe = localStorage.key(i).indexOf(':prod_');
        if (existe != -1) {
            localStorage.removeItem(productoLocaleStarage)
        }
    }
}

function clickConfirmarPedido() {
    let btonConfirmar = document.querySelector("#crear-cta-id")
    btonConfirmar.addEventListener('click', () => {
        let existeProducto = obtenerProductoLocal()
        if (existeProducto != 0) {
            let formaPgo = valorFormaPago()
            if (formaPgo == "") {
                alert('Seleccione una forma de pago')
            } else {
                enviarPedidio()

            }
        } else {
            alert('Carrito de compras vacío, seleccione un producto')
        }
    })

}
window.addEventListener('load', clickConfirmarPedido)


function fechaActual() {
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var fecha = year + '-' + month + '-' + day

    return fecha
}

async function construirPedido() {
    let productos_pedido = []
    for (let i = 0; i < localStorage.length; i++) {
        let productoLocaleStarage = localStorage.key(i);
        let existe = localStorage.key(i).indexOf(':prod_');
        if (existe != -1) {
            let idProducto = localStorage.getItem(productoLocaleStarage)
            let precioProducto = document.querySelector(`#precio-id${idProducto}`).dataset.precio
            productos_pedido.push({
                id_producto: idProducto,
                precio_producto: precioProducto
            })

        }
    }


    let idUsuario = 0
    let datosUsuario = await buscarUsuario()
    let formaPago = valorFormaPago()
    let precioXproducto = document.querySelector("#total-id").dataset.precio

    if (datosUsuario != null) {
        idUsuario = datosUsuario[0].id_usuario
    }

    var cuerpoPedido = {
        fecha_pedido: fechaActual(),
        total_pago: precioXproducto,
        id_usuario: idUsuario,
        codigo_forma_pago: formaPago,
        codigo_estatus: "PD-01",
        detalle_pedido: productos_pedido
    }

    return cuerpoPedido
}

async function enviarPedidio() {
    let token = localStorage.getItem('Auht')

    let respuestaJson = ""
    let datos = await construirPedido()
    let reqInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(datos)
    }
    try {
        let respuestaFectch = await fetch(backendEndpoints + '/pedidos/', reqInit)
        console.log(respuestaFectch.ok)
        if (respuestaFectch.ok) {
            respuestaJson = await respuestaFectch.json()
            console.log(respuestaJson)
        }
    } catch (err) {
        console.log(err)
    }

    if (respuestaJson.Code == 100) {
        borrarProductoLocal()
        localStorage.setItem('order', respuestaJson.Id_Pedido)
        window.location.replace('./envio-pedido.html')
    } else if (respuestaJson.Code == -100) {
        alert('Su sesión ha expirado')
        localStorage.removeItem('Auht')
        window.location.replace('./login.html')
    } else {
        alert('Tu pedido no pudo ser procesado')
    }
}

cargarContenidPagina()