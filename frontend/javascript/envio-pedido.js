function irEstadoPedido() {
    let btonEdoPedido = document.querySelector("#crear-cta-id")
    btonEdoPedido.addEventListener('click', () => {
        window.location.replace('http://127.0.0.1:5500/frontend/estado-pedido.html')
    })
}
window.addEventListener('load', irEstadoPedido)