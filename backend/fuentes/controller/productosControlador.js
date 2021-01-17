const mysqlConnection = require('../database')

//GET LISTAR TODOS
function verProductos(req, res) {
    mysqlConnection.query('SELECT * FROM productos WHERE estado = 1', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows)
        } else {
            console.log(err)
        }
    })
}

//GET IMAGEN PRODUCTO
function imagenProductos(req, res) {
    const { name } = req.query
    const filepath = __dirname
    const fullPath = filepath.replace('controller', 'public/imagenes/') + name
    res.status(200).sendFile(fullPath)
}

//GET X ID
function productoId(req, res) {
    const id = req.params.id
    const body = req.body
    let sentenceSql = `SELECT * FROM productos WHERE id_productos = ${id}`
    mysqlConnection.query(sentenceSql, body, function(err, rows, fields) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(rows)
        }
    })
}

//PUT
function actualizarProducto(req, res) {
    const body = req.body
    const id = req.params.id
    let updateSql = "UPDATE productos SET ? WHERE id_productos = '" + id + "'"

    mysqlConnection.query(updateSql, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                code: -100,
                mensaje: 'Error actualizando el producto:' + err
            })
        } else {
            res.status(200).json({
                code: 100,
                mensaje: "Producto actualizado con exito"
            })
        }
    })
}

//DELETE  --->  TOMARLO DE PLANTILLA PARA EL CAMBIAR ESTADO DE PEDIDO
function borraProducto(req, res) {
    const body = req.body
    const id = req.params.id
    let sentenceSqlDelete = "UPDATE delilah_resto.productos SET estado = 0 WHERE id_productos = '" + id + "'"

    mysqlConnection.query(sentenceSqlDelete, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                code: -100,
                mensaje: 'Error borrando el producto:' + err
            })
        } else {
            res.status(200).json({
                code: 100,
                mensaje: "El producto a sido inactivado con exito"
            })
        }
    })
}

module.exports = { verProductos, imagenProductos, productoId, actualizarProducto, borraProducto }