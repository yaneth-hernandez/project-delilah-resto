function clickComenzar() {
    let btonComenzar = document.getElementById('crear-cta-id')
    btonComenzar.addEventListener('click', () => {
        window.location.replace('http://127.0.0.1:5500/frontend/registro.html?registro')
    })
}
window.addEventListener('load', clickComenzar)