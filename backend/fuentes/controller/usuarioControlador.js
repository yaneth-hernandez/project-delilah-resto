const usuarios = require('../archivos_pruebas/usuarios_prueba')
const mysqlConnection = require('../database')

//GET LISTAR TODOS
function verUsuarios(req, res) {
    //return res.status(200).json(usuarios.items)
    //console.log(usuarios.items)
    mysqlConnection.query('SELECT * from usuarios', function(err, rows, fields) {
        if (err) throw err
        return res.json(rows);
    });
    mysqlConnection.end();
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
function crearUsuarios(req, res) {
    const body = req.body
    let sentenceSql = `INSERT INTO usuarios (usuario_alias, nombre_apellido, email, telefono, direccion, passw, id_rol) VALUES (` +
        "'" + body.usuario + "'," +
        "'" + body.nombre + "'," +
        "'" + body.email + "'," +
        body.telefono + "," +
        "'" + body.direccion + "'," +
        body.password + "," +
        "'cliente')"

    mysqlConnection.query(sentenceSql, body, function(err, result) {
        let mensaje = ''
        let code = 0
        if (err) {
            code = -100
            mensaje = 'Error'
        } else {
            mensaje = "Usuario creado con exito"
            code = 100
        }
        res.json({
            Mensaje: mensaje,
            Code: code,
        })
    });
    console.log('Usuario registrado:' + JSON.stringify(body));
}

//POST USUARIO ADMIN
function crearUsuariosAdmin(req, res) {
    const body = req.body
    let sentenceSqlUadmin = `INSERT INTO usuarios (usuario_alias, nombre_apellido, email,passw, id_rol) VALUES (` +
        "'" + body.usuario + "'," +
        "'" + body.nombre + "'," +
        "'" + body.email + "'," +
        body.password + "," +
        "'admin')"

    mysqlConnection.query(sentenceSqlUadmin, body, function(err, result) {
        let mensaje = ''
        let code = 0
        if (err) {
            code = -100
            mensaje = 'Error'
        } else {
            mensaje = "Usuario administrador creado con exito"
            code = 100
        }
        res.json({
            Mensaje: mensaje,
            Code: code,
        })
    });
    console.log('Usuario administrador registrado:' + JSON.stringify(body));
}
//POST LOGIN
function loginUsuarios(req, res) {
    const body = req.body
    let sentenceSelectSql = `SELECT id_usuario,usuario_alias,id_rol FROM usuarios WHERE usuario_alias = '${body.usuario}' AND  passw = ${body.password}`

    mysqlConnection.query(sentenceSelectSql, function(err, rows, fields) {
        if (rows == null) {
            res.status(400).json({
                Mensaje: "Problemas al autenticar usuario"
            })
        } else {
            res.status(200).json({
                Mensaje: "Usuario autenticado con exito",
                Code: 100,
                rol: rows[0].id_rol,
                Login: rows[0].usuario_alias,
                Id: rows[0].id_usuario
            })
        }
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

module.exports = { verUsuarios, usuarioId, usuarioRol, crearUsuarios, crearUsuariosAdmin, loginUsuarios, actualizarUsuario, borraUsuario }