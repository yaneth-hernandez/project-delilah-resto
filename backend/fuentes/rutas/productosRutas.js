const express = require('express')
const controlProductos = express.Router()
const productosControlador = require('../controller/productosControlador')
const mdwVerificarToken = require('../middleware/auth')

controlProductos.get('/', productosControlador.verProductos)

controlProductos.get('/imagenes', productosControlador.imagenProductos)

controlProductos.get('/:id', productosControlador.productoId)

//controlProductos.post('/', productosControlador.crearProducto)

//controlProductos.post('/upload', productosControlador.enviarImagenes)

controlProductos.put('/:id', mdwVerificarToken.verificarToken, productosControlador.actualizarProducto) //ok

controlProductos.delete('/:id', mdwVerificarToken.verificarToken, productosControlador.borraProducto) //ok



module.exports = controlProductos