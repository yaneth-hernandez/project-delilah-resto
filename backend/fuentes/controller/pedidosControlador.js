const pedidos = require('../archivos_pruebas/pedidos_prueba')
const mysqlConnection = require('../database')

//GET LISTAR TODOS
function verPedidos(req, res) {
    return res.status(200).json(pedidos.pedido)
        //console.log(pedidos.pedido)5

}

//GET X ID
function pedidosId(req, res) {
    const id = req.params.id

    res.status(200).json(pedidos.pedido[id - 1])
    console.log(pedidos.pedido[id - 1])
}
//POST
function crearPedidos(req, res) {
    const body = req.body
    console.log('Pedido registrado:' + JSON.stringify(body));
    res.json({
        Mensaje: "Pedido creado con exito",
        Code: 100,
        item: body.detalle_pedido,
        Id: 10000
    })


}

//PUT
function actualizarPedido(req, res) {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `Pedido modificados`
    })
    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} actualizados`)
}

//DELETE
function borrarPedidos(req, res) {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `datos de id borrados`
    })

    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} borrados`)

}

module.exports = { verPedidos, pedidosId, crearPedidos, actualizarPedido, borrarPedidos }