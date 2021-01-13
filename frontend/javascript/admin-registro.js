/*====================================
              ADMÍN                     
====================================*/
function eventBtnCrearCtaAdmin() {
    const btonCrearAdmin = document.getElementById('admin-crear-cta-id')
    btonCrearAdmin.addEventListener('click', async(e) => {

        let nombre = document.getElementById('admin-nombre-apellido-id').value
        let email = document.getElementById('admin-email-id').value
        let password = document.getElementById('admin-password-id').value

        if (validarRegistros(nombre, email, password)) {
            var resultado = await enviarUsuarios(nombre, email, password)
            console.log('result de fetch: ' + JSON.stringify(resultado));

            if (resultado.Code == 100) {
                alert('Usuario Creado')
                window.location.replace("./login.html?usuario")
            } else if (resultado.Code == -100) {
                alert('Problemas para crear el usuario')
            }
        }
    })
}
window.addEventListener('load', eventBtnCrearCtaAdmin)

async function enviarUsuarios(nombre, email, password) {
    let datos = {
        usuario: email,
        nombre: nombre,
        email: email,
        password: password
    }
    let requestInit = {
        method: 'POST',

        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify(datos)
    }
    try {
        let responsToFetch = await fetch('http://127.0.0.1:3020/delilah-resto/usuarios/admin', requestInit)
        if (responsToFetch.ok) {
            let respuestaJson = await responsToFetch.json()
            return respuestaJson
        }
    } catch (err) {
        console.log(err)
    }
}

function validarRegistros(nombre, email, password) {
    let expresionNombre = /^[a-zA-ZÀ-ÿ\s]/
    let esValido = true

    if (nombre === "") {
        alert('Todos los campos son obligatorios')
        esValido = false
    } else if (nombre.length > 35 && expresionNombre.test(nombre)) {
        alert('El campo no debe ser tan largo')
        esValido = false
    }

    if (!validarEmail(email)) {
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

function validarPassword(password) {
    let esValido = false
    let expresion = /^.{6,8}$/
    if (password != "" && expresion.test(password) && password.length <= 8) {
        esValido = true
    }
    return esValido
}