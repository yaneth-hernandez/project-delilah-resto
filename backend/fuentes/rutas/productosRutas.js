const express = require('express')
const controlProductos = express.Router()
const productosControlador = require('../controller/productosControlador')
const mdwVerificarToken = require('../middleware/auth')


/*******************************
 *      LISTAR PRODUCTO        *
 *******************************/
/**
 * Obtiene listado de productos
 * @route GET /delilah-resto/productos
 * @group Productos
 * @returns {object} 200 - Información de todos los productos
 * @returns {Error}  500 -Error al listar productos
 */
controlProductos.get('/', productosControlador.verProductos)

controlProductos.get('/imagenes', productosControlador.imagenProductos)


/*******************************
 *  VER PRODUCTO POR ID       *
 *******************************/
/**
 * Obtiene un producto por ID
 * @route GET /delilah-resto/productos/{id}
 * @group Productos
 * @param {integer} id.path.required -Id del producto a obtener
 * @returns {object} 200 - Información de todos los pedidos
 * @returns {Error}  500 -Error al listar pedidos
 */
controlProductos.get('/:id', productosControlador.productoId)


/*******************************
 *  ACTUALIZAR PRODUCTOS       *
 *******************************/
/**
 * @typedef ActualizarProductoModelo
 * @property {string} nombre.required -Nombre del producto
 * @property {string} descripcion.required -Descripción del producto
 * @property {string} file.required -File, imagen
 * @property {integer} precio.required -Precio del producto
 */

/**
 * @typedef RespActualizarProductoOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Actualizar/Modificar un producto
 * @route PUT /delilah-resto/productos/{id}
 * @group Productos 
 * @param {integer} id.path.required -Id del producto a actualizar
 * @param {string} imagen.formData.required -Imagen
 * @param {string} nombre.formData.required -Nombre del producto
 * @param {string} descripcion.formData.required -Descripción del producto
 * @param {integer} precio.formData.required -Precio del producto
 * @consumes application/x-www-form-urlencoded
 * @returns {RespActualizarProductoOk.model} 200 - 
 * @returns {Error}  400 - {Mensaje: "Error actualizando productos"}
 * @security JWT
 */
controlProductos.put('/:id', mdwVerificarToken.verificarToken, productosControlador.actualizarProducto) //ok


/*******************************
 *       BORRAR PRODUCTO       *
 *******************************/
/**
 * @typedef RespuestaBorrarProductoOk
 * @property {string} Mensaje.required
 * @property {integer} Code.required
 */

/**
 * Borra el registro de un producto
 * @route DELETE /delilah-resto/productos/{id}
 * @group Productos 
 * @param {integer} id.path.required -Id del producto a borrar
 * @returns {Error}  500 - {Mensaje: "Error borrando el producto", Code:-100}
 * @security JWT
 */
controlProductos.delete('/:id', mdwVerificarToken.verificarToken, productosControlador.borraProducto) //ok



module.exports = controlProductos