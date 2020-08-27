const usuarios = require('../archivos_pruebas/usuarios_prueba')
const mysqlConnection = require('../database')

//GET LISTAR TODOS
function verUsuarios(req, res) {
    return res.status(200).json(usuarios.items)
}

//GET X ID
function usuarioId(req, res) {
    const id = req.params.id
    res.status(200).json(usuarios.items[id - 1])
    console.log(usuarios.items[id - 1])
}
//GET X ROLES
function usuarioRol(req, res) {
    return res.status(200).send({ mensaje: 'Usuario obtenido por rol' })
}
//POST
function crearUsuario(req, res) {
    const body = req.body
    console.log('Usuario registrado:' + body.usuarios);
    res.json({
        Mensaje: "Usuario creado con exito",
        Code: 100,
        Login: body.usuarios,
        Id: 10000
    })
}

//PUT
function actualizarUsuario(req, res) {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `datos modificados`
    })
    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} actualizados`)
}

//DELETE
function borraUsuario(req, res) {
    const id = req.params.id
    const body = req.body
    res.json({
        respuesta: `datos de id borrados`
    })

    console.log(`Obteniedo id:${id} datos ${JSON.stringify(body)} borrados`)

}

module.exports = { verUsuarios, usuarioId, usuarioRol, crearUsuario, actualizarUsuario, borraUsuario }