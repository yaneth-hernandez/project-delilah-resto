const express = require('express')
const controlUsuario = express.Router()
const { verUsuarios, usuarioId, usuarioRol, crearUsuario, actualizarUsuario, borraUsuario } = require('../controller/usuarioControlador')


controlUsuario.get('/', verUsuarios)

controlUsuario.get('/:id', usuarioId)

controlUsuario.get('/:id/rol', usuarioRol)

controlUsuario.post('/', crearUsuario)

controlUsuario.put('/:id', actualizarUsuario)

controlUsuario.delete('/:id', borraUsuario)


module.exports = controlUsuario