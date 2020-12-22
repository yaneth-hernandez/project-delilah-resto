/*hacer get*/

function eventLogin() {
    const bton = document.getElementById('crear-cta-id')
    bton.addEventListener('click', async(e) => {
        let email = document.getElementById('email-id').value
        let password = document.getElementById('password-id').value

        if (validarLogin(email, password)) {
            var usuarioDatos = await logueoUsuarios(email, password);
            console.log('result de fetch: ' + JSON.stringify(usuarioDatos));
            var obtenerToken = JSON.stringify(usuarioDatos.token)
            localStorage.setItem('token', obtenerToken)
            if (usuarioDatos.rol == 'admin') {
                alert('Usted ha ingresado como administrador')
                window.location.replace("http://127.0.0.1:5500/frontend/admin-listar-pedidos.html")

            } else if (usuarioDatos.rol == 'cliente') {
                alert('Bienvenido a Delilah-Restó')
                window.location.replace("http://127.0.0.1:5500/frontend/menu.html")
            } else {
                alert('Lo sentimos!, por favor valide su usuario y contraseña.')
            }
        } else {
            alert('Lo sentimos! error en los datos ingresados.')
        }
    })
}
window.addEventListener('load', eventLogin)

async function logueoUsuarios(email, password) {
    let data = {
        usuario: email,
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
    let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/usuarios/login', reqInit)
    if (respuestaFectch) {
        let respuestaJson = await respuestaFectch.json()
        var token = respuestaJson.token
        localStorage.removeItem('Auht')
        localStorage.setItem('Auht', token)
        return respuestaJson
    }
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


function validarLogin(email, password) {
    let esValido = true

    if (!validarEmail(email)) {
        esValido = false
    }
    if (!validarPassword(password)) {
        esValido = false
    }
    return esValido
}