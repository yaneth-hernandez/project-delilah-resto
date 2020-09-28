function eventBtnCrearCta() {
    const bton = document.getElementById('crear-cta-id')
    bton.addEventListener('click', async(e) => {

        let nombre = document.getElementById('nombre-apellido-id').value
        let email = document.getElementById('email-id').value
        let telefono = document.getElementById('telefono-id').value
        let direccion = document.getElementById('direccion-id').value
        let password = document.getElementById('password-id').value

        if (validarDatosRegistro(nombre, email, telefono, direccion, password)) {
            var result = await crearUsuarios(nombre, email, telefono, direccion, password)
            console.log('result de fetch: ' + JSON.stringify(result));
            console.log('result de fetch: ' + JSON.stringify(result));
            if (result.Code == 100) {
                alert('Usuario Creado')
                window.location.replace("http://127.0.0.1:5500/frontend/login.html?usuario")
            } else if (result.Code == -100) {
                alert('problemas para crear el usuario')
            }
        }
    })
}
window.addEventListener('load', eventBtnCrearCta)

async function crearUsuarios(nombre, email, telefono, direccion, password) {
    let data = {
        usuario: email,
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        password: password
    }
    let reqInit = {
        method: 'POST',

        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify(data)
    }
    try {
        let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/usuarios', reqInit)
        if (respuestaFectch.ok) {
            let respuestaJson = await respuestaFectch.json()
            return respuestaJson
        }
    } catch (err) {
        console.log(err)
    }
}

function validarDatosRegistro(nombre, email, telefono, direccion, password) {
    let expresionNombre = /^[a-zA-ZÀ-ÿ\s]/
    let esValido = true

    if (nombre === "" || direccion === "") {
        alert('Todos los campos son obligatorios')
        esValido = false
    } else if (nombre.length > 35 && direccion.length > 80 && expresionNombre.test(nombre) && expresionNombre.test(direccion)) {
        alert('El campo no debe ser tan largo')
        esValido = false
    }

    if (!validarEmail(email)) {
        esValido = false
    }
    if (!validarTelefono(telefono)) {
        esValido = false
    }
    if (!validarPassword(password)) {
        esValido = false
    }

    return esValido
}

function validarEmail(email) {
    let esValido = false
    let expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (email != "" && expresion.test(email) && email.length <= 35) {
        esValido = true
    }
    return esValido
}

function validarTelefono(telefono) {
    let esValido = false
    let expresion = /^\d{7,12}$/
    if (telefono != "" && expresion.test(telefono) && telefono.length <= 12) {
        esValido = true
    }
    return esValido
}

function validarPassword(password) {
    let esValido = false
    let expresion = /^.{6,8}$/
    if (password != "" && expresion.test(password) && password.length <= 8) {
        esValido = true
    }
    return esValido
}