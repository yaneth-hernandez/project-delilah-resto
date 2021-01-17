const express = require('express')
const controlPedidos = express.Router()
const pedidosControlador = require('../controller/pedidosControlador')
const mdwVerificarToken = require('../middleware/auth')

/*******************************
 *      LISTAR PEDIDO          *
 *******************************/
/**
 * Se obtiene un listado que contiene todos los pedidos
 * @route GET /delilah-resto/pedidos
 * @group Pedido
 * @returns {object} 200 - Información de todos los pedidos
 * @returns {Error}  500 -Error al listar pedidos
 * @security JWT
 */
controlPedidos.get('/', mdwVerificarToken.verificarTokenUsuAdmin, pedidosControlador.verPedidos)


/*******************************
 *  VER PEDIDO POR ID       *
 *******************************/
/**
 * Se obtiene un pedido por ID
 * @route GET /delilah-resto/pedidos/{id}
 * @group Pedido
 * @param {integer} id.path.required -Id del pedido a obtener
 * @returns {object} 200 - Información de todos los pedidos
 * @returns {Error}  500 -Error al listar pedidos
 * @security JWT
 */
controlPedidos.get('/:id', mdwVerificarToken.verificarTokenUsuAdmin, pedidosControlador.pedidosId)


/*******************************
 * VER DETALLE DE UN PEDIDO ID *
 *******************************/
/**
 * Se obtiene eñ detalle completo de un pedido
 * @route GET /delilah-resto/pedidos/{id}/status
 * @group Pedido
 * @param {integer} id.path.required -Id del pedido a obtener
 * @returns {object} 200 - Información sobre la facturaciónde un pedido detallado
 * @returns {Error}  500 -Error al listar pedidos
 */
controlPedidos.get('/:id/status', pedidosControlador.estadoPedidoId)

/*******************************
 *       CREAR PEDIDO          *
 *******************************/
/**
 * @typedef DetallePedidoModelo
 * @property {string} id_producto.required -Identificador producto
 * @property {integer} cantidad_producto.required -Cantidad producto
 * @property {string} precio_producto.required -Valor por unidad
 */

/**
 * @typedef PedidoModelo
 * @property {string} fecha_pedido.required -Fecha de creación
 * @property {string} total_pago.required -Total pago
 * @property {integer} id_usuario.required -Identificador usuario
 * @property {string} codigo_forma_pago.required -Forma de pago usada
 * @property {string} codigo_estatus.required -Estatus del pedido
 * @property {Array.<DetallePedidoModelo>} detalle_pedido -Detalle productos
 */

/**
 * @typedef RespuestaPedidoOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 * @property {integer} Id_Pedido.required
 */

/**
 * Crear un pedido
 * @route POST /delilah-resto/pedidos
 * @group Pedido 
 * @param {PedidoModelo.model} pedidoModelo.body - Detalle Pedido
 * @returns {RespuestaPedidoOk.model} 200 - Detalle de pedido creado
 * @returns {Error}  500 - {Mensaje: "Error al crear detalle del pedido"}
 * @security JWT
 */
controlPedidos.post('/', mdwVerificarToken.verificarToken, pedidosControlador.crearPedidos) //ok

/*******************************
 *       ACTUALIZAR PEDIDO     *
 *******************************/
/**
 * @typedef ActualizarPedidoModelo
 * @property {string} id_producto.required -Identificador producto
 * @property {string} precio_producto.required -Valor por unidad
 */

/**
 * @typedef ActualizarPedidoModelo
 * @property {string} fecha_pedido.required -Fecha de creación
 * @property {string} total_pago.required -Total pago
 * @property {integer} id_usuario.required -Identificador usuario
 * @property {string} codigo_forma_pago.required -Forma de pago usada
 * @property {string} codigo_estatus.required -Estatus del pedido
 * @property {Array.<DetallePedidoModelo>} detalle_pedido -Detalle productos
 */

/**
 * @typedef RespuestaActualizarPedidoOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 * @property {integer} IdPedido.required
 * @property {string} EstatusActual.required
 */

/**
 * Actualiza un el estado de un pedido
 * @route PUT /delilah-resto/pedidos/{id}
 * @group Pedido 
 * @param {integer} id.path.required -Id del pedido a actualizar
 * @param {ActualizarPedidoModelo.model} actualizarPedidoModelo.body - Detalle Pedido
 * @returns {RespuestaActualizarPedidoOk.model} 200 - Estatus de pedido actualizado de manera exitosa
 * @returns {Error}  500 - {Mensaje: "Error al actualizar el pedido"}
 * @security JWT
 */
controlPedidos.put('/:id', mdwVerificarToken.verificarTokenUsuAdmin, pedidosControlador.actualizarPedido) //ok


/*******************************
 *       BORRAR PEDIDO          *
 *******************************/
/**
 * @typedef RespuestaBorrarPedidoOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Borrar un pedido registrado
 * @route DELETE /delilah-resto/pedidos/{id}
 * @group Pedido 
 * @param {integer} id.path.required -Id del pedido a borrar
 * @returns {Error}  500 - {Mensaje: "Error al borrar el pedido"}
 * @security JWT
 */
controlPedidos.delete('/:id', mdwVerificarToken.verificarTokenUsuAdmin, pedidosControlador.borrarPedidos) //ok


module.exports = controlPedidos