const productos = require('../archivos_pruebas/productos_prueba')
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

//POST
function crearProducto(body, imagenNombre) {
    var mensaje = ''
    var code = 0
    var id = 0
    let sentenceSql = `INSERT INTO productos (nombre, descripcion, imagen, precio) VALUES (` +
        "'" + body.nombre + "'," +
        "'" + body.descripcion + "'," +
        "'" + imagenNombre + "'," +
        body.precio + ")"
    mysqlConnection.query(sentenceSql, body, function(err, result) {
        if (err) {
            console.log(err)
            code = -100
            mensaje = 'Error'
        } else {
            mensaje = "Producto creado con exito"
            code = 100
            id = result.insertId
        }
    })
    console.log('Producto registrado: conuevoid = ' + id);
    return {
        Mensaje: mensaje,
        Code: code,
        item: body,
        Id: id
    }
}

//PUT
function actualizarProducto(req, res) {
    const body = req.body
    var mensaje = ''
    var code = 0
    let updateSql = 'UPDATE productos SET ? WHERE id_productos = ' + body.id_productos

    mysqlConnection.query(updateSql, body, function(err, result) {
        if (err) {
            console.log(err)
            code = -100
            mensaje = 'Error borrando el producto:' + err;
        } else {
            mensaje = "Producto borrado con exito"
            code = 100
        }
    })
    return {
        Mensaje: mensaje,
        Code: code
    }
}

//DELETE  --->  TOMARLO DE PLANTILLA PARA EL CAMBIAR ESTADO DE PEDIDO
function borraProducto(req, res) {
    const body = req.body
    var mensaje = ''
    var code = 0

    let sentenceSqlDelete = `UPDATE delilah_resto.productos SET estado = 0 WHERE id_productos = ${body.id_productos}`

    mysqlConnection.query(sentenceSqlDelete, body, function(err, result) {
        if (err) {
            console.log(err)
            code = -100
            mensaje = 'Error borrando el producto:' + err;
        } else {
            mensaje = "Producto borrado con exito"
            code = 100
        }
    })
    return {
        Mensaje: mensaje,
        Code: code
    }
}

module.exports = { verProductos, imagenProductos, productoId, crearProducto, actualizarProducto, borraProducto }