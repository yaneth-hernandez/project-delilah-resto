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
}

function removerProducto(id) {
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

/*async function obtenerDireccionEnvio(direccion, idUsuario) {
    let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/usuario/id');
    let resultJson = await respuestaFectch.json()
    console.log(resultJson)

    let respuestaDireccion = resultJson.direccion
    let valorDireccion = document.querySelector(`#direccion-id${idUsuario}`).value
    valorDireccion = respuestaDireccion

    return valorDireccion
}*/

cargarContenidPagina()