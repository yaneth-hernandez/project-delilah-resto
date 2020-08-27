function irMenuUsuarioReg() {
    let btonSeguirPidiendo = document.querySelector("#crear-cta-id")
    btonSeguirPidiendo.addEventListener('click', () => {
        window.location.replace('http://127.0.0.1:5500/frontend/menu.html')
    })
}
window.addEventListener('load', irMenuUsuarioReg)