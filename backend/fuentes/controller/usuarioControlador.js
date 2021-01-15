const mysqlConnection = require('../database')
const jwt = require('jsonwebtoken')



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

//GET X USUARIO EN SESIÓN
function obtenerUsuario(req, res) {
    const body = req.body
    const bearerHeader = req.headers['authorization']
    const bearerToken = bearerHeader.split(" ")[1]
    jwt.verify(bearerToken, process.env.SECRETKEY, (error, authData) => {
        console.log(authData)
        if (!error && authData != null) {
            let sentenceSqlIdUsuario = `SELECT * FROM usuarios WHERE usuario_alias ='${authData.usuario_alias}'`

            mysqlConnection.query(sentenceSqlIdUsuario, body, function(err, rows, fields) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).json(rows)
                }
            })

        } else if (error.name == 'TokenExpiredError') {
            res.status(200).json({
                mensaje: 'Error en autenticación',
                code: -100
            })
        } else {
            console.log(error)
            res.sendStatus(403)
        }
    })

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
        console.log(err)
        if (err) {
            res.status(400).json({
                Mensaje: 'Error al ingresar los datos',
                Code: -100,
            })

        } else {
            res.status(200).json({
                Mensaje: "Usuario creado con exito",
                Code: 100,
            })
        }

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
            mensaje = 'Error al ingresar los datos'
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
    console.log(req)
    console.log(body.usuario)
    console.log(body.password)
    let sentenceSelectSql = `SELECT id_usuario,usuario_alias,id_rol FROM usuarios WHERE usuario_alias = '${body.usuario}' AND  passw = ${body.password}`

    mysqlConnection.query(sentenceSelectSql, function(errSelect, rows, fields) {
        if (rows == null) {
            return res.status(400).json({
                Mensaje: "Problemas al autenticar usuario"
            })
        } else {
            const { usuario, password, id } = req.body
            jwt.sign({ usuario_alias: usuario, passw: password, id_usuario: id }, process.env.SECRETKEY, { expiresIn: process.env.TIMETOKEN }, (err, token) => {
                if (!err) {
                    return res.status(200).json({
                        Mensaje: "Usuario autenticado con exito",
                        Code: 100,
                        rol: rows[0].id_rol,
                        Login: rows[0].usuario_alias,
                        Id: rows[0].id_usuario,
                        token: token
                    })
                } else {
                    console.log('error token' + err)
                    return res.status(400).json({
                        Mensaje: "Problemas al autenticar usuario:" + err.code
                    })
                }
            })
        }
    })
}


//PUT
function actualizarUsuario(req, res) {
    const id = req.params.id
    const body = req.body
    let updateSqlUsuario = "UPDATE usuarios SET ? WHERE id_usuario = '" + id + "'"
    mysqlConnection.query(updateSqlUsuario, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                code: -100,
                mensaje: 'Error actualizando el usuario:' + err
            })
        } else {
            res.status(200).json({
                code: 100,
                mensaje: "Usuario actualizado con exito"
            })
        }
    })
}

//DELETE
function borraUsuario(req, res) {
    const id = req.params.id
    const body = req.body
    let sentenceSqlDeleteUsuario = "DELETE FROM usuarios WHERE id_usuario = '" + id + "'"
    mysqlConnection.query(sentenceSqlDeleteUsuario, body, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({
                code: -100,
                mensaje: 'Error borrando el usuario:' + err
            })
        } else {
            res.status(200).json({
                code: 100,
                mensaje: "Usuario borrado con exito"
            })
        }
    })
}



module.exports = { verUsuarios, obtenerUsuario, crearUsuarios, crearUsuariosAdmin, loginUsuarios, actualizarUsuario, borraUsuario }