/*hacer get*/

function eventLogin() {
    const bton = document.getElementById('crear-cta-id')
    bton.addEventListener('click', async(e) => {
        datosInicioSeseion()
    })
}
window.addEventListener('load', eventLogin)

async function datosInicioSeseion() {
    let email = document.getElementById('email-id').value
    let password = document.getElementById('password-id').value

    if (validarLogin(email, password)) {
        var usuarioDatos = await logueoUsuarios(email, password);
        console.log('result de fetch: ' + JSON.stringify(usuarioDatos));
        if (usuarioDatos != null && usuarioDatos.rol == 'admin') {
            alert('Usted ha ingresado como administrador')
            window.location.replace("./admin-listar-pedidos.html")

        } else if (usuarioDatos.rol == 'cliente') {
            alert('Bienvenido a Delilah-Restó')
            window.location.replace("./menu.html")
        } else {
            alert('Lo sentimos!, por favor valide su usuario y contraseña.')
        }
    } else {
        alert('Lo sentimos! error en los datos ingresados.')
    }
}

async function logueoUsuarios(email, password) {
    let data = {
        usuario: email,
        password: password
    }
    let reqInit = {
        method: 'POST',

        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST",
        },
        body: JSON.stringify(data)
    }
    try {
        let respuestaFectch = await fetch(backendEndpoints + '/usuarios/login', reqInit)
        if (respuestaFectch.ok) {
            let respuestaJson = await respuestaFectch.json()
            var token = respuestaJson.token
            localStorage.removeItem('Auht')
            localStorage.setItem('Auht', token)
            return respuestaJson
        }
    } catch (error) {
        console.log(error)
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