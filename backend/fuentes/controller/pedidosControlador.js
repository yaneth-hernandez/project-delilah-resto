//const pedidosPrueba = require('../archivos_pruebas/pedidos_prueba')
const mysqlConnection = require('../database')


//GET LISTAR TODOS
function verPedidos(req, res) {
    const body = req.body
    let sentenceSqlListaPedido = `SELECT pedido.id_pedido, pedido.id_usuario, pedido.fecha_pedido, pedido.total_pago, pedido.codigo_forma_pago, pedido.codigo_estatus, usuario.direccion, usuario.nombre_apellido 
FROM pedidos AS pedido, usuarios AS usuario
WHERE pedido.id_usuario = usuario.id_usuario`

    mysqlConnection.query(sentenceSqlListaPedido, body, (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows)
        } else {
            res.status(500).send('Error al listar pedidos')
            console.log(err)
        }
    })
}


//GET X ID  
function pedidosId(req, res) {
    const id = req.params.id
    const body = req.body
    let sentenceSqlPedidoId = `SELECT * FROM pedidos WHERE id_pedido = ${id}`
    mysqlConnection.query(sentenceSqlPedidoId, body, function(err, rows, fields) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(rows)
        }
    })

}

//GET ESTADO DEL PEDIDO
function estadoPedidoId(req, res) {
    const id = req.params.id
    const body = req.body
    let sentenceSqlPedidoId = `SELECT pedido.id_pedido, pedido.id_usuario, pedido.fecha_pedido, pedido.total_pago, pedido.codigo_forma_pago, pedido.codigo_estatus, usuario.nombre_apellido, usuario.direccion, usuario.telefono FROM pedidos AS pedido, usuarios AS usuario WHERE pedido.id_usuario = usuario.id_usuario
    AND id_pedido = ${id}`
    mysqlConnection.query(sentenceSqlPedidoId, body, function(err, rows, fields) {
        if (err) {
            res.status(500).json('Error en obtención de pedido')
            console.log(err)
        } else {
            let sentenceSqlVerDetallePedido = `SELECT detalle.id_producto, producto.nombre, producto.imagen,detalle.precio_producto FROM detalle_pedido AS detalle, productos AS producto WHERE producto.id_productos = detalle.id_producto AND id_pedido = ${id}`
            mysqlConnection.query(sentenceSqlVerDetallePedido, body, function(errDetalle, rowsDetalle, fieldsDetalle) {
                if (errDetalle) {
                    res.status(500).json('Error en obtención de detalle de pedido')
                    console.log(errDetalle)
                } else {
                    var resultadoPedido = {
                        Pedido: rows,
                        detalle: rowsDetalle
                    }
                    console.log(resultadoPedido)
                    res.status(200).json(resultadoPedido)
                }
            })
        }
    })
}

//POST
function crearPedidos(req, res) {
    const body = req.body
    console.log('cuerpo' + JSON.stringify(body) + 'pedido')
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
                Mensaje: 'Error al crear  el pedido:' + err,
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
                    Code: code,

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
    const body = req.body
    const id = req.params.id
    let updateSqlPedido = 'UPDATE pedidos SET codigo_estatus =' + "'" + body.codigo_estatus + "'" +
        '  WHERE id_pedido = ' + id

    mysqlConnection.query(updateSqlPedido, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                Mensaje: 'Error actualizar  el pedido:' + err,
                Code: -100
            })
        } else {
            res.status(200).json({
                Mensaje: 'Estatus de pedido actualizado de manera exitosa',
                Code: 100,
                IdPedido: body.id_pedido,
                EstatusActual: body.codigo_estatus
            })
        }
    })
}

//DELETE
function borrarPedidos(req, res) {
    const body = req.body
    const id = req.params.id
    let deleteSqlPedido = "DELETE FROM pedidos WHERE id_pedido = '" + id + "'"
    let deleteSqlDetallePedido = "DELETE FROM detalle_pedido WHERE id_pedido = '" + id + "'"
    mysqlConnection.query(deleteSqlDetallePedido, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                Mensaje: 'Error al borrar el pedido:' + err,
                Code: -100
            })
        } else {
            mysqlConnection.query(deleteSqlPedido, body, function(error, resultado) {
                if (error) {
                    console.log(error)
                    res.status(500).json({
                        Mensaje: 'Error al borrar el pedido:' + err,
                        Code: -100
                    })
                } else {
                    res.status(200).json({
                        Mensaje: 'Estatus de pedido borrado con exito',
                        Code: 100,

                    })
                }
            })
        }
    })

}

module.exports = { verPedidos, pedidosId, estadoPedidoId, crearPedidos, actualizarPedido, borrarPedidos }