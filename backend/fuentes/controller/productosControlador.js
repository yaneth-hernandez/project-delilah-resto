const productos = require('../archivos_pruebas/productos_prueba')
const mysqlConnection = require('../database')

//GET LISTAR TODOS
function verProductos(req, res) {
    return res.status(200).json(productos)
        //console.log(productos)5

}

//GET X ID
function productoId(req, res) {
    const id = req.params.id
    res.status(200).json({
        mensaje: `id ${id} obtenido`
    })
    console.log(id)
}
//POST
function crearProducto(req, res) {
    const body = req.body
    console.log('Producto registrado:' + body.nombre);
    res.json({
        Mensaje: "Producto creado con exito",
        Code: 100,
        item: body.nombre,
        Id: 10000
    })


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