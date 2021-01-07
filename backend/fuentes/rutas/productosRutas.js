const express = require('express')
const controlProductos = express.Router()
const productosControlador = require('../controller/productosControlador')
const mdwVerificarToken = require('../middleware/auth')

controlProductos.get('/', productosControlador.verProductos)

controlProductos.get('/imagenes', productosControlador.imagenProductos)

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
 * @property {string} Mensaje
 * @property {integer} Code
 */

/**
 * This function comment is parsed by doctrine
 * @route PUT /delilah-resto/productos/{id}
 * @group Productos 
 * @param {integer} id.path.required
 * @param {string} imagen.formData.required -Imagen
 * @param {string} nombre.formData.required -Nombre del producto
 * @param {string} descripcion.formData.required -Descripción del producto
 * @param {integer} precio.formData.required -Precio del producto
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
 * @property {string} Mensaje
 * @property {integer} Code
 */

/**
 * This function comment is parsed by doctrine
 * @route DELETE /delilah-resto/productos/{id}
 * @group Productos 
 * @param {integer} id.path.required
 * @returns {Error}  500 - {Mensaje: "Error borrando el producto", Code:-100}
 * @security JWT
 */
controlProductos.delete('/:id', mdwVerificarToken.verificarToken, productosControlador.borraProducto) //ok



module.exports = controlProductos