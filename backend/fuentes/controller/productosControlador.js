const productos = require('../archivos_pruebas/productos_prueba')
const mysqlConnection = require('../database')



//GET LISTAR TODOS
function verProductos(req, res) {
    return res.status(200).json(productos.items)
        //console.log(productos.items)5

}

//GET X ID
function productoId(req, res) {
    const id = req.params.id

    res.status(200).json(productos.items[id - 1])
    console.log(productos.items[id - 1])
}
//POST
function crearProducto(body, imagenNombre) {
    var mensaje = ''
    var code = 0
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
        }
    })
    console.log('Producto registrado:' + JSON.stringify(body));
    return {
        Mensaje: mensaje,
        Code: code,
        item: body,
        Id: 10000
    }
}

//PUT
function actualizarProducto(req, res) {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `Producto modificados`
    })
    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} actualizados`)
}

//DELETE
function borraProducto(req, res) {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `datos de id borrados`
    })

    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} borrados`)

}

module.exports = { verProductos, productoId, crearProducto, actualizarProducto, borraProducto }