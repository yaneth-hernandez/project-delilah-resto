//mostrar productos obtenidos
async function obtenerProductos() {
    let respuestaBusqueda = await fetch('http://localhost:3020/delilah-resto/productos');
    let resultadoDatos = await respuestaBusqueda.json();

    resultadoDatos.forEach(result => {
        var objectResult = new ProductosClass(result);

        mostrarProductosHtml(objectResult)
    })
}

class ProductosClass {
    constructor(obj) {
        if (obj != null) {
            this.id = obj.id_productos;
            this.nombre = obj.nombre;
            this.imagen = obj.imagen;
            this.precio = obj.precio;
            this.stock = obj.estado;
        }
    }
}

function mostrarProductosHtml(objectResult) {
    let nombreClase = ''
    let seleccionValor = ''
    let existenciaPedido = validarExistenciaId(objectResult.id)
    let rutaImg = 'http://127.0.0.1:3020/delilah-resto/productos/imagenes?name=' + objectResult.imagen

    if (existenciaPedido == null) {
        nombreClase = 'btn-menu'
        seleccionValor = '+'
    } else {
        nombreClase = 'btn-menu-check'
        seleccionValor = 'x'
    }

    let contenedorMenu = `
                <div class="plato-img" id="plato-img-id${objectResult.id}">
                    <img src="${rutaImg}" alt="plato" class="img-menu" id="img-menu-id${objectResult.id}">
                    <p><span class="texto-label" id="texto-label-id${objectResult.id}">${objectResult.nombre}</span><br>
                    <span class="precio-label" id="precio-prod-id${objectResult.id}" >${objectResult.precio}$</span></p>
                </div>
                <div class="contenedor-checheck" class="contenedor-checheck-id">
                    <label class="${nombreClase}" id="btn-menu-id${objectResult.id}" 
                    onclick="buscarProductoId(${objectResult.id})">${seleccionValor}</label>
                    
                </div>`

    let formularioMenu = document.getElementById('formulario-registro-id')
    var div = document.createElement('div')
    div.className = 'content-menu'
    div.id = `content-menu-id${objectResult.id}`
    div.innerHTML = contenedorMenu
    formularioMenu.append(div)
}

//OBTENER CONFIGURACIÓN DE URL PARA HAYAR ID
function obtenerUrl(id) {
    let urlId = 'http://localhost:3020/delilah-resto/productos/' + id

    return urlId
}

//BUSCAR ID DEL PRODUCTO
async function buscarProductoId(id) {
    let urlBusqueda = obtenerUrl(id)
    let busqueda = await fetch(urlBusqueda)
    let respuesta = await busqueda.json(id)
    agrgarRemoverProducto(id)
    return respuesta
}
//TODOS LOS IDS SON DINÁMICOS
function agrgarRemoverProducto(id) {
    let nombreKey = `usuario-${id}:prod_${id}`
    let guardado = localStorage.getItem(nombreKey)
    if (guardado == null) {
        let check = document.querySelector(`#btn-menu-id${id}`)
        check.className = 'btn-menu-check'
        check.textContent = 'x'
        localStorage.setItem(nombreKey, id)
    } else {
        let check = document.querySelector(`#btn-menu-id${id}`)
        check.className = 'btn-menu'
        check.textContent = '+'
        localStorage.removeItem(nombreKey)
    }
}

function validarExitstePedido() {
    let existePedido = false

    for (let i = 0; i < localStorage.length; i++) {
        let existe = localStorage.key(i).indexOf(':prod_');
        if (existe != -1) {
            existePedido = true;
            break
        }
    }
    return existePedido
}

function validarExistenciaId(id) {
    let nombreKey = `usuario-${id}:prod_${id}`
    let existePedido = localStorage.getItem(nombreKey)

    return existePedido
}

function agregarPedido() {
    let btonAgregar = document.getElementById("crear-cta-id")
    btonAgregar.addEventListener('click', () => {
        let existe = validarExitstePedido()
        if (existe == true) {
            window.location.replace('./detalle-pedido.html?detalle-pedidos')
        } else {
            alert('Debe seleccionar un producto para continuar')
        }
    })
}
window.addEventListener('load', agregarPedido)

obtenerProductos()