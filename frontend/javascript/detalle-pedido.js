async function cargarContenidPagina() {
    let productos = obtenerProductoLocal()
    let sumaTotalPedido = 0

    for (const item of productos) {
        let producto = await buscarProductoFetch(item)
        let objectResult = new ProductosClass(producto);

        sumaTotalPedido += objectResult.precio
        mostrarPedidoHtml(objectResult)
    }

    //mostrar suma sumaTotalPedido
    let precioTotal = document.querySelector("#total-id")
    precioTotal.value = `Total: $${sumaTotalPedido}`
    precioTotal.dataset.precio = sumaTotalPedido

    //buscar dirección usuario
    let usuario = await buscarUsuario(obtenerUsuarioSesion())
    let elementoDireccionUsuario = document.querySelector('#direccion-id')
    elementoDireccionUsuario.value = usuario.direccion

}

async function buscarUsuario(idUsuario) {
    let url = 'http://127.0.0.1:3020/delilah-resto/usuarios/' + idUsuario
    let respuestaFectch = await fetch(url);
    let resultJson = await respuestaFectch.json()

    return resultJson
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
        this.id = obj.id_producto;
        this.nombre = obj.nombre_producto;
        this.imagen = obj.imagen_producto;
        this.precio = obj.precio_producto;
        this.stock = obj.stock_productos;

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

    let detallePedido = ` <div class="plato-img" id="plato-img-id${producto.id}">
    <img src="${producto.imagen}" alt="plato" class="img-menu" id="img-menu-id${producto.id}">
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
    let formaPago = document.querySelector("#selec-pago-id").value

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

    let idUsuario = obtenerUsuarioSesion()
    let datosUsuario = await buscarUsuario(idUsuario)
    let formaPago = valorFormaPago()
    let precioXproducto = document.querySelector("#total-id").dataset.precio

    var cuerpoPedido = {
        order: {
            process_order: {
                hora_pedido: "12:99", //hora del cliente
                detalle_pedido: productos_pedido,
                usuario: {
                    id_usuario: datosUsuario.id_usuario
                },
                pago: {
                    forma_pago: formaPago, //traerselo del div depago
                    monto_pagar: precioXproducto //traerselo del devi de pago
                }
            }
        }
    }
    return cuerpoPedido
}

async function enviarPedidio() {
    let respuestaJson = ""
    let datos = await construirPedido()
    let reqInit = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify(datos)
    }
    try {
        let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/pedidos', reqInit)
        console.log(respuestaFectch.ok)
        if (respuestaFectch.ok) {
            respuestaJson = await respuestaFectch.json()
        }
    } catch (err) {
        console.log(err)
    }

    if (respuestaJson.Code == 100) {
        borrarProductoLocal()
        window.location.replace('http://127.0.0.1:5500/frontend/envio-pedido.html')
    } else {
        alert('Tu pedido no pudo ser procesado')
    }
}

cargarContenidPagina()