function eventBtnCrearCta() {
    const bton = document.getElementById('crear-cta-id')
    bton.addEventListener('click', async(e) => {
        let usuario = document.getElementById('usuario-id').value
        let nombre = document.getElementById('nombre-apellido-id').value
        let email = document.getElementById('email-id').value
        let telefono = document.getElementById('telefono-id').value
        let direccion = document.getElementById('direccion-id').value
        let password = document.getElementById('password-id').value

        var result = await capturarDatos(usuario, nombre, email, telefono, direccion, password)
        console.log('result de fetch: ' + JSON.stringify(result));
        console.log('result de fetch: ' + JSON.stringify(result));

        /* let result = {
            Mensaje: "Usuario creado con exito",
            Code: 100,
            Login: "123456@gmail.com",
            Id: 10000
        } */

        if (result.Code == 100) {
            alert('Usuario Creado')
            window.location.replace("http://127.0.0.1:5500/frontend/login.html")
        } else if (result.Code == -100) {
            alert('problemas para crear el usuario')
        }

    })
}
window.addEventListener('load', eventBtnCrearCta)

async function capturarDatos(usuario, nombre, email, telefono, direccion, password) {
    let data = {
        usuario: usuario,
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
        let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/usuario', reqInit)
        if (respuestaFectch.ok) {
            let respuestaJson = await respuestaFectch.json()
            return respuestaJson
        }
    } catch (err) {
        console.log(err)
    }
}