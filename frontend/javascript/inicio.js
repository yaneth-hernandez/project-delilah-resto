function clickComenzar() {
    let btonComenzar = document.getElementById('crear-cta-id')
    btonComenzar.addEventListener('click', () => {
        window.location.replace('./registro.html')
    })
}
window.addEventListener('load', clickComenzar)

function clickAdministrador() {
    let btonComenzar = document.getElementById('crear-cta-adm-id')
    btonComenzar.addEventListener('click', () => {
        window.location.replace('./admin-registro.html')
    })
}
window.addEventListener('load', clickAdministrador)