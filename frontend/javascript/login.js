/*hacer get*/

function eventLogin() {
    const bton = document.getElementById('crear-cta-id')
    bton.addEventListener('click', async(e) => {
        let email = document.getElementById('email-id').value
        let password = document.getElementById('password-id').value

        var result = await logueoUsuarios(email, password);

        console.log('result de fetch: ' + JSON.stringify(result));
        // console.log('result de fetch: ' + JSON.stringify(result));
    })
}
window.addEventListener('load', eventLogin)

async function logueoUsuarios(email, password) {
    let respuestaFectch = await fetch('http://127.0.0.1:3020/delilah-resto/usuario');
    let resultJson = await respuestaFectch.json()
    console.log(resultJson)
    return resultJson
}