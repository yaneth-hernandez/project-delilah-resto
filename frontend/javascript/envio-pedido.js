function irEstadoPedido() {
    let btonEdoPedido = document.querySelector("#crear-cta-id")
    btonEdoPedido.addEventListener('click', () => {
        window.location.replace('./estado-pedido.html')
    })
}
window.addEventListener('load', irEstadoPedido)