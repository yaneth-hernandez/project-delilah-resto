const pedidosPrueba = require('../archivos_pruebas/pedidos_prueba')
const mysqlConnection = require('../database')

//GET LISTAR TODOS
function verPedidos(req, res) {
    return res.status(200).json(pedidosPrueba.pedidos.pedido_cont)
        //console.log(pedidos.pedido)5

}

//GET X ID  
function pedidosId(req, res) {
    const id = req.params.id

    res.status(200).json(pedidosPrueba.pedidos.pedido_cont[id - 1])
    console.log(pedidosPrueba.pedidos.pedido_cont[id - 1])
}

//GET ESTADO DEL PEDIDO
function estadoPedidoId(req, res) {
    const id = req.params.id

    res.status(200).json(pedidosPrueba.status)
    console.log(pedidosPrueba.status)
}


//POST
function crearPedidos(req, res) {
    const body = req.body

    let sentenceSqlPostPedido = `INSERT INTO pedidos (fecha_pedido, total_pago, id_usuario, codigo_forma_pago,codigo_estatus) VALUES (` +
        "'" + body.fecha_pedido + "'," +
        "'" + body.total_pago + "'," +
        +body.id_usuario + "," +
        "'" + body.codigo_forma_pago + "'," +
        "'" + body.codigo_estatus + "')"
    mysqlConnection.query(sentenceSqlPostPedido, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                Mensaje: 'Error crear  el pedido:' + err,
                Code: -100
            })

        } else {
            let mensaje = ''
            let code = 0

            try {
                crearDetallePedidos(result.insertId, body)
                mensaje = 'Detalle de pedido creado'
                code = 100

                res.status(200).json({
                    Mensaje: mensaje,
                    Code: code
                })


            } catch (errorDetalle) {
                console.log(errorDetalle)
                mensaje = 'Error al crear detalle del pedido'
                code = -100

                res.status(500).json({
                    Mensaje: mensaje,
                    Code: code
                })
            }
        }
    })
}

function crearDetallePedidos(idPedido, body) {
    var detalle = body.detalle_pedido
    if (detalle != null) {
        for (let i = 0; i < detalle.length; i++) {
            let sentenceSqlPostPedido = `INSERT INTO  detalle_pedido (id_pedido, id_producto, precio_producto) VALUES (` +
                idPedido + "," +
                detalle[i].id_producto + "," +
                detalle[i].precio_producto + ")"
            mysqlConnection.query(sentenceSqlPostPedido, body, function(err, result) {
                if (err) throw err;
            })
        }
    }
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

module.exports = { verPedidos, pedidosId, estadoPedidoId, crearPedidos, actualizarPedido, borrarPedidos }