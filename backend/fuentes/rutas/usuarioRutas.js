const express = require('express')
const controlUsuario = express.Router()
const { verUsuarios, usuarioId, usuarioRol, crearUsuarios, crearUsuariosAdmin, loginUsuarios, actualizarUsuario, borraUsuario } = require('../controller/usuarioControlador')


controlUsuario.get('/', verUsuarios)

controlUsuario.get('/:id', usuarioId)

controlUsuario.get('/:id/rol', usuarioRol)

controlUsuario.post('/', crearUsuarios)

controlUsuario.post('/admin', crearUsuariosAdmin)

controlUsuario.post('/login', loginUsuarios)

controlUsuario.put('/:id', actualizarUsuario)

controlUsuario.delete('/:id', borraUsuario)


module.exports = controlUsuario