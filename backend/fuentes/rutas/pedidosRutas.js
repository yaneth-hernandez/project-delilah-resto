const express = require('express')
const controlPedidos = express.Router()
const pedidosControlador = require('../controller/pedidosControlador')


controlPedidos.get('/', pedidosControlador.verPedidos)

controlPedidos.get('/:id', pedidosControlador.pedidosId)

controlPedidos.post('/', pedidosControlador.crearPedidos)

controlPedidos.put('/:id', pedidosControlador.actualizarPedido)

controlPedidos.delete('/:id', pedidosControlador.borrarPedidos)


module.exports = controlPedidos