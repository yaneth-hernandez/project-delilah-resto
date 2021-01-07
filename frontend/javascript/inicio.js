function clickComenzar() {
    let btonComenzar = document.getElementById('crear-cta-id')
    btonComenzar.addEventListener('click', () => {
        window.location.replace('http://127.0.0.1:5500/frontend/registro.html?registro')
    })
}
window.addEventListener('load', clickComenzar)

function clickAdministrador() {
    let btonComenzar = document.getElementById('crear-cta-adm-id')
    btonComenzar.addEventListener('click', () => {
        window.location.replace('http://127.0.0.1:5500/frontend/admin-registro.html')
    })
}
window.addEventListener('load', clickAdministrador)