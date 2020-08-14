/*hacer get*/

function eventBtnCrearCta() {
    const bton = document.getElementById('crear-cta-id')
    bton.addEventListener('click', async(e) => {
        let email = document.getElementById('email-id').value
        let password = document.getElementById('password-id').value

        var result = await capturarDatos(email, password);

        console.log('result de fetch: ' + JSON.stringify(result));
        console.log('result de fetch: ' + JSON.stringify(result));
    })
}
window.addEventListener('load', eventBtnCrearCta)

async function capturarDatos(email, password) {
    let data = { usuario: email, password: password };
    let reqInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Method": "POST"
        },
        body: JSON.stringify(data)
    }

    try {
        const respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/usuario', reqInit);
        if (respuestaFectch.ok) {
            let resultJson = await respuestaFectch.json();
            return resultJson;
        }
    } catch (err) {
        console.log(err)
    }
}