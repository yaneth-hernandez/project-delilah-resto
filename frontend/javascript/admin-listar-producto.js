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

//editar borrar
function abrirEditarBorrar(id) {
    let overly = document.getElementById('overlay-id')
    overly.classList.add('active')
    console.log(id)

    let idProductoEditarBorrar = document.querySelector(`#nom-prod-id`)
    idProductoEditarBorrar.value = id

    var nombre = document.querySelector('#nombre-producto-' + id).textContent
    let nombreProductoEditarBorrar = document.querySelector("#it-prod-id")
    nombreProductoEditarBorrar.value = nombre

    var descripcion = document.querySelector("#descriocion-producto-" + id).textContent
    let descripcionProductoEditarBorrar = document.querySelector("#desc-prod-id")
    descripcionProductoEditarBorrar.value = descripcion

    var mostrarImagen = document.querySelector("#imagen-eb")
    mostrarImagen.src = document.querySelector("#imagen-" + id).src

    var precio = document.querySelector(`#precio-producto-${id}`).textContent
    let precioProductoEditarBorrar = document.querySelector("#precio-admin-id")
    precioProductoEditarBorrar.value = precio
}

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
        validarDatosRegistroProducto()
        limpiarFormulario()
    })

}
window.addEventListener('load', cargarProducto)

function validarDatosRegistroProducto() {
    let nombreProducto = document.querySelector("#nom-prod-cargar-id").value
    let descripcionProducto = document.querySelector("#des-prod-cargar-id").value
    let imagenProducto = document.querySelector("#img-admin-cargar-id").value
    let precioProducto = document.querySelector("#precio-admin-cargar-id").value

    if (nombreProducto === '' && descripcionProducto === '' && imagenProducto === '' && precioProducto === '') {
        alert('Todos los campos son obligatorios')
    } else {
        alert('Usted ha credao un producto de manera exitosa')
    }

}

async function obtenerListaProductos() {
    let url = 'http://127.0.0.1:3020/delilah-resto/productos'
    let respuestaFectch = await fetch(url);
    let resultJson = await respuestaFectch.json()

    return resultJson
}
obtenerListaProductos()



async function mostrarListaProductosHtml() {
    let sectionContenidoTabla = document.querySelector("#contenido-tabla-id")

    let contenidoJson = await obtenerListaProductos()
    for (let i = 0; i < contenidoJson.length; i++) {
        let rutaImg = 'http://127.0.0.1:3020/delilah-resto/productos/imagenes?name=' + contenidoJson[i].imagen

        let contenidoTabla = `<div class="item-tabla" id="numero-producto-${contenidoJson[i].id_productos}">${contenidoJson[i].id_productos}</div>
        <div class="item-tabla" id="imagen-producto-${contenidoJson[i].id_productos}"><img src=${rutaImg} alt="" class="imagen-class" id="imagen-${contenidoJson[i].id_productos}"></div>
        <div class="item-tabla" id="nombre-producto-${contenidoJson[i].id_productos}">${contenidoJson[i].nombre}</div>
        <div class="item-tabla" id="descriocion-producto-${contenidoJson[i].id_productos}">${contenidoJson[i].descripcion}</div>
        <div class="item-tabla" id="precio-producto-${contenidoJson[i].id_productos}"><span class="seccion-direccion" id="valor-precio-${contenidoJson[i].id_productos}">${contenidoJson[i].precio}</span></div>
        <div class="item-tabla" id="acciones-${contenidoJson[i].id_productos}"><button onclick="abrirEditarBorrar(${contenidoJson[i].id_productos})"class="edita-borrar" id="edita-borrar-${contenidoJson[i].id_productos}">EDITAR/BORRAR</button></div>`

        let divProductos = document.createElement('div')
        divProductos.className = 'tabla-productos-items'
        divProductos.id = 'tabla-productos-items-id'
        divProductos.innerHTML = contenidoTabla

        sectionContenidoTabla.append(divProductos)

    }
}
mostrarListaProductosHtml()

//borrar producto

async function borraProducto(id) {
    let datos = {
        id_productos: id
    }

    let requestInit = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "DELETE"
        },
        body: JSON.stringify(datos)
    }
    try {
        let responsToFetch = await fetch('http://127.0.0.1:3020/delilah-resto/productos/borrar/', requestInit)
        if (responsToFetch.ok) {
            let respuestaJson = await responsToFetch.json()

            if (respuestaJson.code == 100) {
                //cerrar ventana editar borrar
                mostrarListaProductosHtml()
            } else {
                //no cerrar ventana editar borrar
            }

        }
    } catch (err) {
        console.log(err)
    }

}

function clickBorrarProducto() {
    let btonBorrar = document.querySelector("#borrar-listar-id")
    btonBorrar.addEventListener('click', () => {
        var id = document.querySelector("#nom-prod-id").value
        console.log(id)
        borraProducto(id)
    })
}
window.addEventListener('load', clickBorrarProducto)

async function actualizarProducto(id, nombre, descripcion, imagen, precio) {
    let nombreImgen = ""
    let arregloImagen = imagen.split("=");
    if (arregloImagen != null) {
        nombreImgen = arregloImagen[1]
    }

    let datos = {
        id_productos: id,
        nombre: nombre,
        descripcion: descripcion,
        imagen: nombreImgen,
        precio: precio,
        estado: 1
    }

    let requestInit = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "PUT"
        },
        body: JSON.stringify(datos)
    }
    try {
        let responsToFetch = await fetch('http://127.0.0.1:3020/delilah-resto/productos/', requestInit)
        if (responsToFetch.ok) {
            let respuestaJson = await responsToFetch.json()

            if (respuestaJson.code == 100) {
                //cerrar ventana editar borrar
                mostrarListaProductosHtml()
            } else {
                //no cerrar ventana editar borrar
            }

        }
    } catch (err) {
        console.log(err)
    }
}

function clickActualizar() {
    const btonActualizar = document.querySelector("#actualizar-listar-id")
    btonActualizar.addEventListener('click', () => {

        let id = document.querySelector(`#nom-prod-id`).value
        let nombre = document.querySelector("#it-prod-id").value
        let descripcion = document.querySelector("#desc-prod-id").value
        let imagen = document.querySelector("#imagen-eb").src
        let precio = document.querySelector("#precio-admin-id").value
        actualizarProducto(id, nombre, descripcion, imagen, precio)
    })
}
window.addEventListener('load', clickActualizar)