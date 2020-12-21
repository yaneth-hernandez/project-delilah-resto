const express = require('express')
const controlPedidos = express.Router()
const pedidosControlador = require('../controller/pedidosControlador')
const mdwVerificarToken = require('../middleware/auth')


controlPedidos.get('/', pedidosControlador.verPedidos)

controlPedidos.get('/:id', pedidosControlador.pedidosId)

controlPedidos.get('/:id/status', pedidosControlador.estadoPedidoId)

controlPedidos.post('/', mdwVerificarToken.verificarToken, pedidosControlador.crearPedidos) //ok

controlPedidos.put('/:id', mdwVerificarToken.verificarToken, pedidosControlador.actualizarPedido) //ok

controlPedidos.delete('/:id', mdwVerificarToken.verificarToken, pedidosControlador.borrarPedidos) //ok


module.exports = controlPedidos